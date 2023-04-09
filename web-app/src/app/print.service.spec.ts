import { TestBed } from '@angular/core/testing';
import { PrintService } from './print.service';
import { SerialService } from './serial.service';
import { Subject } from 'rxjs';

describe('PrintService', () => {
  let service: PrintService;
  let mockSerialService: jasmine.SpyObj<SerialService>;
  let mockTimerWorker: {
    onmessage: Function;
    postMessage: jasmine.Spy<jasmine.Func>;
  };

  beforeEach(() => {
    mockSerialService = jasmine.createSpyObj<SerialService>(
      'SerialService',
      ['send'],
      {
        disconnectEvent: new Subject(),
      }
    );

    mockTimerWorker = {
      onmessage: () => {},
      postMessage: jasmine.createSpy(),
    };
    spyOn(window, 'Worker').and.returnValue(mockTimerWorker as any);

    TestBed.configureTestingModule({
      providers: [
        PrintService,
        { provide: SerialService, useValue: mockSerialService },
      ],
    });
    service = TestBed.inject(PrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start printing', () => {
    service.text = 'a';
    service.animationType = 'no';

    service.startPrint();

    expect(service.printActive).toBeTrue();

    //It should set text out
    expect(service.textOutBefore).toBe('');
    expect(service.textOutHighlight).toBe('a');
    expect(service.textOutAfter).toBe(' ');

    //It should set webFrameBuff (char a has 20 pixels set)
    expect(service.webFrameBuff.filter((v) => v).length).toBe(20);
    expect(service.webFrameBuff.filter((v) => !v).length).toBe(64 - 20);

    //It should output data to serial port
    const expectedData = new Uint8Array([
      0x55, 0x00, 0x00, 0x78, 0x0c, 0x7c, 0xcc, 0x76, 0x00,
    ]);
    expect(mockSerialService.send).toHaveBeenCalledOnceWith(expectedData);
  });

  it('should output block on invalid character', () => {
    service.text = 'ą';
    service.animationType = 'no';

    service.startPrint();

    expect(service.webFrameBuff.filter((v) => v).length).toBe(64);
  });

  it('should schedule next animation frame', () => {
    service.printSpeed = 1;
    service.startPrint();

    //Next frame should be scheduled
    expect(mockTimerWorker.postMessage).toHaveBeenCalledOnceWith({
      action: 'start',
      time: 50,
    });

    //Test different speed
    service.printSpeed = 0.1;

    //Execute scheduled frame
    mockTimerWorker.onmessage();
    expect(mockTimerWorker.postMessage).toHaveBeenCalledWith({
      action: 'start',
      time: 500,
    });
  });

  it('should animate - no', () => {
    service.text = 'b';
    service.animationType = 'no';

    service.startPrint();

    //b should be displayed
    expect(service.webFrameBuff.filter((v) => v).length).toBe(25);

    //Execute next frame 8 times to go to next char
    [...Array(8)].forEach(() => mockTimerWorker.onmessage());

    //space should be displayed
    expect(service.webFrameBuff.filter((v) => v).length).toBe(0);
  });

  it('should animate - left', () => {
    service.text = 'c';
    service.animationType = 'left';

    service.startPrint();

    const expectedValues = [
      3, 8, 10, 12, 16, 18, 18, 18, 15, 10, 8, 6, 2, 0, 0, 0,
    ];
    for (let i = 0; i < 16; i++) {
      expect(service.webFrameBuff.filter((v) => v).length).toBe(
        expectedValues[i]
      );

      //execute next frame
      mockTimerWorker.onmessage();
    }
  });

  it('should animate - up', () => {
    service.text = 'c';
    service.animationType = 'up';

    service.startPrint();

    const expectedValues = [
      0, 0, 4, 8, 10, 14, 18, 18, 18, 18, 14, 10, 8, 4, 0, 0,
    ];
    for (let i = 0; i < 16; i++) {
      expect(service.webFrameBuff.filter((v) => v).length).toBe(
        expectedValues[i]
      );

      //execute next frame
      mockTimerWorker.onmessage();
    }
  });

  it('should stop', () => {
    service.text = 'a';
    service.animationType = 'no';
    service.startPrint();

    service.stopPrint();

    expect(service.printActive).toBeFalse();

    //It should stop scheduled frame
    expect(mockTimerWorker.postMessage).toHaveBeenCalledWith({
      action: 'stop',
    });

    //It should clean framebuffer
    expect(service.webFrameBuff.filter((v) => v).length).toBe(0);

    //And output it over serial
    const expectedData = new Uint8Array([0x55, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(mockSerialService.send).toHaveBeenCalledWith(expectedData);
  });

  it('should stop on serial disconnect', () => {
    service.startPrint();

    mockSerialService.disconnectEvent.next();

    expect(service.printActive).toBeFalse();
  });

  it('should reset values between runs', () => {
    service.animationType = 'no';
    service.text = 'abc';
    service.startPrint();

    //Char a
    expect(service.webFrameBuff.filter((v) => v).length).toBe(20);

    //Go to next char
    [...Array(8)].forEach(() => mockTimerWorker.onmessage());

    //Char b
    expect(service.webFrameBuff.filter((v) => v).length).toBe(25);

    //Stop, display should be empty
    service.stopPrint();
    expect(service.webFrameBuff.filter((v) => v).length).toBe(0);

    //Start again, should be at char a
    service.startPrint();
    expect(service.webFrameBuff.filter((v) => v).length).toBe(20);
  });

  it('should startStop', () => {
    //Start
    service.startStop();
    expect(service.printActive).toBeTrue();

    //Stop
    service.startStop();
    expect(service.printActive).toBeFalse();
  });
});
