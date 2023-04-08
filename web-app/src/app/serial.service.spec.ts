import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SerialService } from './serial.service';

describe('SerialService', () => {
  let service: SerialService;
  let mockSerial: MockSerial;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    mockSerial = new MockSerial();
    spyOnProperty(window.navigator, 'serial').and.returnValue(
      mockSerial.Serial
    );

    service = TestBed.inject(SerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to serial port', async () => {
    await service.connect();

    //It should call all the necessary Web Serial API functions
    expect(mockSerial.Serial.requestPort).toHaveBeenCalledOnceWith();
    expect(mockSerial.Port.open).toHaveBeenCalledOnceWith({
      baudRate: service.baudRate,
    });
    expect(
      Object.getOwnPropertyDescriptor(mockSerial.Port, 'ondisconnect')?.set
    ).toHaveBeenCalledTimes(1);
    expect(mockSerial.Writable.getWriter).toHaveBeenCalledOnceWith();

    expect(service.serialConnected).toBeTrue();
  });

  it('should disconnect from serial port', async () => {
    const disconnectEventSpy = spyOn(service.disconnectEvent, 'next');

    await service.connect();
    expect(service.serialConnected).toBeTrue();

    await service.disconnect();

    //It should call all the necessary Web Serial API functions
    expect(mockSerial.Writer.releaseLock).toHaveBeenCalledOnceWith();
    expect(mockSerial.Port.close).toHaveBeenCalledOnceWith();

    //It should emit disconnect event
    expect(disconnectEventSpy).toHaveBeenCalledOnceWith();

    expect(service.serialConnected).toBeFalse();
  });

  it('should disconnect from serial port on serial port disconnect', async () => {
    const disconnectSpy = spyOn(service, 'disconnect');

    await service.connect();
    expect(service.serialConnected).toBeTrue();

    const ondisconnectSpy = Object.getOwnPropertyDescriptor(
      mockSerial.Port,
      'ondisconnect'
    )?.set as jasmine.Spy;
    const ondisconnectCb = ondisconnectSpy.calls.first().args[0];

    ondisconnectCb();

    expect(disconnectSpy).toHaveBeenCalledOnceWith();
  });

  it('should send data to serial port', async () => {
    await service.connect();
    expect(service.serialConnected).toBeTrue();

    const data = new Uint8Array();
    await service.send(data);

    expect(mockSerial.Writer.write).toHaveBeenCalledOnceWith(data);
  });

  it('should have working connectDisconnectUI', async () => {
    await service.connectDisconnectUI();
    expect(service.serialConnected).toBeTrue();

    await service.connectDisconnectUI();
    expect(service.serialConnected).toBeFalse();
  });

  it('should emit errorEvent on error inside connectDisconnectUI', async () => {
    const errorEventSpy = spyOn(service.errorEvent, 'next');
    mockSerial.Serial.requestPort.and.rejectWith(new Error('error message'));

    await service.connectDisconnectUI();

    expect(errorEventSpy).toHaveBeenCalledOnceWith('error message');
  });
});

class MockSerial {
  Writer = jasmine.createSpyObj<WritableStreamDefaultWriter<Uint8Array>>(
    'WritableStream',
    ['write', 'releaseLock']
  );

  Writable = jasmine.createSpyObj<WritableStream<Uint8Array>>(
    'WritableStream',
    {
      getWriter: this.Writer,
    }
  );

  Port = jasmine.createSpyObj<SerialPort>(
    'SerialPort',
    {
      open: Promise.resolve(),
      close: Promise.resolve(),
    },
    {
      ondisconnect: undefined,
      writable: this.Writable,
    }
  );

  Serial = jasmine.createSpyObj<Serial>('Serial', {
    requestPort: Promise.resolve(this.Port),
  });
}
