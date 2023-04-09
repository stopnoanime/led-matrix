import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SerialService } from './serial.service';
import { PrintService } from './print.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugEl: DebugElement;
  let mockSerialService: {
    errorEvent: Subject<string>;
    serialAvailable: boolean;
  };

  beforeEach(async () => {
    mockSerialService = {
      errorEvent: new Subject(),
      serialAvailable: true,
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: SerialService, useValue: mockSerialService },
        { provide: PrintService, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    //Should render header
    expect(debugEl.query(By.css('header'))).toBeTruthy();
  });

  it('should render normally when serial is available', () => {
    //Should not show warning message
    expect(debugEl.query(By.css('#serialWarning'))).toBeFalsy();

    //Should render sub components
    expect(debugEl.query(By.css('app-dot-display'))).toBeTruthy();
    expect(debugEl.query(By.css('app-text-input'))).toBeTruthy();
    expect(debugEl.query(By.css('app-settings-menu'))).toBeTruthy();
  });

  it('should show message when serial is not available', () => {
    mockSerialService.serialAvailable = false;
    fixture.detectChanges();

    //Should show warning message
    expect(debugEl.query(By.css('#serialWarning'))).toBeTruthy();

    //Should not render sub components
    expect(debugEl.query(By.css('app-dot-display'))).toBeFalsy();
    expect(debugEl.query(By.css('app-text-input'))).toBeFalsy();
    expect(debugEl.query(By.css('app-settings-menu'))).toBeFalsy();
  });

  it('should alert on serial port error', () => {
    const alertSpy = spyOn(window, 'alert');

    mockSerialService.errorEvent.next('errorMsg');

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy.calls.first().args[0]).toContain('errorMsg');
  });
});
