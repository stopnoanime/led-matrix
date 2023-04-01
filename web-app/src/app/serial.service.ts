import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SerialService {
  public serialAvailable = 'serial' in navigator;
  public serialConnected = false;

  private port: SerialPort | null = null;
  private baudRate = 115200;

  constructor() {}

  public async connect() {
    this.serialConnected = false;

    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: this.baudRate });
      this.serialConnected = true;
    } catch (err) {
      if ((err as DOMException).name != 'NotFoundError') throw err; //Ignore this error, it is caused by user closing the menu
    }
  }

  public async disconnect() {
    this.serialConnected = false;
    await this.port?.close();
  }

  public async send(data: Uint8Array) {
    if (!this.serialConnected || this.port == null) return;

    const writer = this.port.writable!.getWriter();
    await writer.write(data);
    writer.releaseLock();
  }
}
