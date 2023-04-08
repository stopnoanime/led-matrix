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
  /** Printing frequency = printSpeed * 20Hz */
  public printSpeed = 0.5;
  public animationType: animationType = 'left';
  /** Contains data that is displayed on the real LED Matrix represented as a single dimension array */
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
  private timerWorker: Worker;

  constructor(private serial: SerialService) {
    serial.disconnectEvent.subscribe(() => this.stopPrint());

    this.timerWorker = new Worker(new URL('./timer.worker', import.meta.url));
    this.timerWorker.onmessage = () => this.print();
  }

  /** Stops printing if it is already active, otherwise starts printing */
  public startStop() {
    if (this.printActive) this.stopPrint();
    else this.startPrint();
  }

  /** Starts printing text */
  public startPrint() {
    if (this.printActive) return;

    //Prepare text
    this.textToPrint = this.text;
    const lastChar = this.textToPrint.slice(-1);
    if (lastChar != ' ' && lastChar != '\n') this.textToPrint += ' '; //Add trailing space

    //Reset values
    this.strPos = 0;
    this.frameNumber = 0;

    this.printActive = true;
    this.print();
  }

  /** Stops printing text */
  public stopPrint() {
    if (!this.printActive) return;

    this.printActive = false;

    this.timerWorker.postMessage({ action: 'stop' });

    this.frameBuff.fill(0);
    this.sendFrameBuff(this.frameBuff);
    this.setWebFrameBuff(this.frameBuff);
  }

  /** Main execution loop */
  private print() {
    if (!this.printActive) return;

    //Starting to print new char
    if (this.frameNumber == 0) {
      this.setTextOut(this.strPos);

      let charCode = this.textToPrint.charCodeAt(this.strPos);
      if (charCode > 127) charCode = 0x1f; //Show block if the char isn't basic ASCII

      this.charBitMap = font[charCode];
      this.strPos = ++this.strPos % this.textToPrint.length;
    }

    this.updateFrameBuff(
      this.frameBuff,
      this.charBitMap,
      this.animationType,
      this.frameNumber
    );
    this.sendFrameBuff(this.frameBuff);
    this.setWebFrameBuff(this.frameBuff);

    this.frameNumber = ++this.frameNumber % 8;

    this.timerWorker.postMessage({
      action: 'start',
      time: 50 / this.printSpeed,
    });
  }

  /** Updates frame buffer based on animation type, frame number and current character */
  private updateFrameBuff(
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

  /** Outputs frame buffer to serial port */
  private sendFrameBuff(frameBuff: Uint8Array) {
    this.serial.send(new Uint8Array([0x55, ...frameBuff]));
  }

  /** Converts frameBuffer to a more web friendly format */
  private setWebFrameBuff(frameBuff: Uint8Array) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.webFrameBuff[y * 8 + x] = !!(frameBuff[y] & (0x80 >> x));
      }
    }
  }

  /** Highlights currently drawn character */
  private setTextOut(pos: number) {
    this.textOutBefore = this.textToPrint.slice(0, pos);
    this.textOutHighlight = this.textToPrint.slice(pos, pos + 1);
    this.textOutAfter = this.textToPrint.slice(pos + 1);
  }
}

export type animationType = 'left' | 'up' | 'no';
