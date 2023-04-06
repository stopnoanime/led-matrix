import { Component, OnInit } from '@angular/core';
import { PrintService } from './print.service';
import { SerialService } from './serial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public serial: SerialService, public print: PrintService) {}

  ngOnInit(): void {
    this.serial.errorEvent.subscribe((err) =>
      alert(`An serial port error ocurred: ${err}`)
    );
  }
}
