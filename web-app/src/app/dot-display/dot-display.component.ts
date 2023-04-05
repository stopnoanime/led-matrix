import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dot-display',
  templateUrl: './dot-display.component.html',
  styleUrls: ['./dot-display.component.scss'],
})
export class DotDisplayComponent {
  @Input() frameBuff: boolean[] = [];
}
