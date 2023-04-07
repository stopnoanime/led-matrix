import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';

import { SettingsMenuComponent } from './settings-menu.component';

describe('SettingsMenuComponent', () => {
  let component: SettingsMenuComponent;
  let fixture: ComponentFixture<SettingsMenuComponent>;
  let debugEl: DebugElement;

  const getButtonWithText = (text: string) =>
    debugEl.query(
      (debugEl) =>
        debugEl.name === 'button' &&
        debugEl.nativeElement.textContent.trim() === text
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsMenuComponent],
      imports: [FormsModule, MatTooltipModule, MatSliderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsMenuComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has working serial connect button', () => {
    spyOn(component.connectDisconnect, 'emit');
    const button = getButtonWithText('Connect');

    expect(button).toBeTruthy();

    //Button text should change after connecting
    component.serialConnected = true;
    fixture.detectChanges();
    expect(button.nativeElement.textContent).toContain('Disconnect');

    //Event should be emitted on click
    button.nativeElement.click();
    expect(component.connectDisconnect.emit).toHaveBeenCalledTimes(1);
  });

  it('has working start stop button', () => {
    spyOn(component.startStop, 'emit');
    const button = getButtonWithText('Start');

    expect(button).toBeTruthy();
    expect(button.properties['disabled']).toBeTrue();

    //Button should become enabled after serial connects
    component.serialConnected = true;
    fixture.detectChanges();
    expect(button.properties['disabled']).toBeFalse();

    //Button text should change after printing becomes active
    component.printActive = true;
    fixture.detectChanges();
    expect(button.nativeElement.textContent).toContain('Stop');

    //Event should be emitted on click
    button.nativeElement.click();
    expect(component.startStop.emit).toHaveBeenCalledTimes(1);
  });

  it('has working animation direction select', fakeAsync(() => {
    spyOn(component.animationTypeChange, 'emit');
    const select = debugEl.query(By.css('select'));

    expect(select).toBeTruthy();

    //It shows current animation direction
    component.animationType = 'up';
    fixture.detectChanges();
    tick();
    expect(select.nativeElement.value).toBe('up');

    //It outputs new animation direction
    select.nativeElement.value = 'left';
    select.nativeElement.dispatchEvent(new Event('change'));
    expect(component.animationTypeChange.emit).toHaveBeenCalledOnceWith('left');
  }));

  it('has working speed slider', () => {
    spyOn(component.printSpeedChange, 'emit');
    const slider = debugEl.query(By.css('#slider'));

    expect(slider).toBeTruthy();

    slider.nativeElement.value = 0.75;
    slider.nativeElement.dispatchEvent(new Event('input'));
    expect(component.printSpeedChange.emit).toHaveBeenCalledOnceWith(0.75);
  });
});
