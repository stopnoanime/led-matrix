import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';
import { SerialService } from '../serial.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  textAreaValue = '';
  
  constructor(public serial: SerialService, public print: PrintService) {}

  ngOnInit(): void {
  }

  async connectDisconnect() {
    if(this.serial.serialConnected) { 
      this.serial.disconnect();
    }
    else {
      try {
        await this.serial.connect();
      }
      catch (err) {
        alert(`There was an error opening the serial port: ${err}`);
      }
    }
  }
}
