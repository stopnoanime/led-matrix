import { Component } from '@angular/core';
import { PrintService } from './print.service';
import { SerialService } from './serial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public serial: SerialService, public print: PrintService) {}

  async connectDisconnect() {
    if (this.serial.serialConnected) {
      this.serial.disconnect();
    } else {
      try {
        await this.serial.connect();
      } catch (err) {
        alert(`There was an error opening the serial port: ${err}`);
      }
    }
  }
}
