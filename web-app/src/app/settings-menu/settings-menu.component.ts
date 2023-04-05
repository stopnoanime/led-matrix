import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animationType } from '../print.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent {
  @Input() serialConnected?: boolean;
  @Input() printActive?: boolean;

  @Input() animationType?: animationType;
  @Output() animationTypeChange = new EventEmitter<animationType>();

  @Output() printSpeedChange = new EventEmitter<number>();

  @Output() connectDisconnect = new EventEmitter<void>();
  @Output() startStop = new EventEmitter<void>();

  sliderChange(event: Event) {
    this.printSpeedChange.emit(+(event.target as HTMLInputElement).value);
  }
}
