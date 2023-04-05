import { Injectable } from '@angular/core';
import font from './font';
import { SerialService } from './serial.service';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  /** Text that is going to be printed */
  public text = '';
  public printActive = false;
  public printSpeed = 0.5;
  public animationType: animationType = 'left';
  public webFrameBuff: boolean[] = new Array(64).fill(false);

  /** The text before the currently drawn character */
  public textOutBefore = '';
  /** The currently drawn character */
  public textOutHighlight = '';
  /** The text after the currently drawn character */
  public textOutAfter = '';

  private textToPrint = '';
  private strPos = 0;
  private frameNumber = 0;
  private charBitMap: number[] = [];
  private frameBuff = new Uint8Array(8);
  private timeoutID!: number;

  constructor(private serial: SerialService) {}

  public startStop() {
    if (this.printActive) this.stopPrint();
    else this.startPrint();
  }

  public startPrint() {
    this.textToPrint = this.text;
    const lastChar = this.textToPrint.slice(-1);
    if (lastChar != ' ' && lastChar != '\n') this.textToPrint += ' '; //Add trailing space

    //Reset values
    this.strPos = 0;
    this.frameNumber = 0;
    this.frameBuff.fill(0);
    this.setTextOut(0);

    this.printActive = true;
    this.setPrintTimeout();
  }

  public stopPrint() {
    this.printActive = false;

    clearTimeout(this.timeoutID);

    this.frameBuff.fill(0);
    this.sendFrameBuff(this.frameBuff);
    this.setWebFrameBuff(this.frameBuff);
  }

  private setPrintTimeout() {
    if (!this.serial.serialConnected)
      this.stopPrint(); //Stop printing if serial is not connected
    else if (this.printActive)
      this.timeoutID = window.setTimeout(
        () => this.print(),
        50 / this.printSpeed
      );
  }

  private print() {
    if (this.frameNumber == 0) {
      //Starting to print new char
      this.setTextOut(this.strPos);

      let charCode = this.textToPrint.charCodeAt(this.strPos);
      if (charCode > 127) charCode = 0x1f; //Show block if the char isn't basic ASCII

      this.charBitMap = font[charCode];

      this.strPos++;
      if (this.strPos == this.textToPrint.length) this.strPos = 0;
    }

    this.setFrameBuff(
      this.frameBuff,
      this.charBitMap,
      this.animationType,
      this.frameNumber
    );
    this.sendFrameBuff(this.frameBuff);
    this.setWebFrameBuff(this.frameBuff);

    this.frameNumber++;
    if (this.frameNumber == 8) this.frameNumber = 0;

    this.setPrintTimeout();
  }

  private setFrameBuff(
    frameBuff: Uint8Array,
    bitMap: number[],
    animationType: animationType,
    frameNumber: number
  ) {
    switch (animationType) {
      case 'no':
        frameBuff.set(bitMap);
        break;

      case 'left':
        frameBuff.forEach((val, i, arr) => {
          arr[i] = (val << 1) | ((bitMap[i] << frameNumber) & 0x80 ? 1 : 0);
        });
        break;

      case 'up':
        frameBuff.forEach((_, i, arr) => {
          if (i == 7) arr[i] = bitMap[frameNumber];
          else arr[i] = arr[i + 1];
        });
        break;
    }
  }

  private sendFrameBuff(frameBuff: Uint8Array) {
    const data = new Uint8Array([0x55, ...frameBuff]);
    this.serial.send(data);
  }

  private setWebFrameBuff(frameBuff: Uint8Array) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.webFrameBuff[i * 8 + j] = !!(frameBuff[i] & (0x80 >> j));
      }
    }
  }

  private setTextOut(pos: number) {
    this.textOutBefore = this.textToPrint.slice(0, pos);
    this.textOutHighlight = this.textToPrint.slice(pos, pos + 1);
    this.textOutAfter = this.textToPrint.slice(pos + 1);
  }
}

export type animationType = 'left' | 'up' | 'no';
