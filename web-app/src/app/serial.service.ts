import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerialService {
  public serialAvailable = 'serial' in navigator;
  public serialConnected = false;
  public baudRate = 115200;

  /** Emits Serial Port error messages */
  public errorEvent = new Subject<string>();
  /** Emits when serial port is disconnected */
  public disconnectEvent = new Subject<void>();

  private port?: SerialPort;
  private writer?: WritableStreamDefaultWriter<Uint8Array>;

  /**
   * Disconnects from serial if it is already connected to it, otherwise tries to connect to one.
   *
   * Any serial port errors emitted from the inside this function are passed to the `errorEvent` subject.
   */
  async connectDisconnect() {
    try {
      if (this.serialConnected) this.disconnect();
      else await this.connect();
    } catch (err: any) {
      this.errorEvent.next(err.message);
    }
  }

  /** Prompts user to select serial port and then connects to it */
  public async connect() {
    if (this.serialConnected) return;

    try {
      this.port = await navigator.serial.requestPort();

      await this.port.open({ baudRate: this.baudRate });
      this.port.ondisconnect = () => this.disconnect();
      this.writer = this.port.writable!.getWriter();

      this.serialConnected = true;
    } catch (err) {
      //Ignore this error, it is caused by user closing the port selection menu
      if ((err as DOMException).name != 'NotFoundError') throw err;
    }
  }

  /** Disconnects from currently connected serial port */
  public async disconnect() {
    if (!this.serialConnected) return;

    this.disconnectEvent.next();

    this.writer?.releaseLock();
    await this.port?.close();

    this.serialConnected = false;
  }

  /** Sends data to serial port */
  public async send(data: Uint8Array) {
    if (!this.serialConnected) return;

    await this.writer?.write(data);
  }
}
