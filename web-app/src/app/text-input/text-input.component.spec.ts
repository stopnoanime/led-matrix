import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(debugEl.query(By.css('textarea'))).toBeTruthy();
  });

  it('it initializes textarea value and outputs text inputted to it', fakeAsync(() => {
    let textarea = debugEl.query(By.css('textarea')).nativeElement;
    spyOn(component.textChange, 'emit');

    //Input test
    component.text = 'input';
    fixture.detectChanges();
    tick();
    expect(textarea.value).toBe('input');

    //Output test
    textarea.value = 'output';
    textarea.dispatchEvent(new Event('input'));

    expect(component.textChange.emit).toHaveBeenCalledWith('output');
  }));

  it('outputs highlighted text when print is active', () => {
    component.printActive = true;
    component.textOutBefore = 'before';
    component.textOutHighlight = 'h';
    component.textOutAfter = 'after';
    fixture.detectChanges();

    let outDiv = debugEl.query(By.css('div.txt-area'));

    expect(outDiv).toBeTruthy();
    expect(outDiv.nativeElement.textContent).toBe('beforehafter');
    expect(outDiv.query(By.css('span')).nativeElement.textContent).toBe('h');
  });
});
