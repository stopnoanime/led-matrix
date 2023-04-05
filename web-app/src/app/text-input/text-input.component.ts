import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() textOutBefore?: string;
  @Input() textOutHighlight?: string;
  @Input() textOutAfter?: string;

  @Input() printActive?: boolean;

  @Input() text?: string;
  @Output() textChange = new EventEmitter<string>();
}
