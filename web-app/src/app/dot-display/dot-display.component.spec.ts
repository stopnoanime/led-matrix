import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DotDisplayComponent } from './dot-display.component';

describe('DotDisplayComponent', () => {
  let component: DotDisplayComponent;
  let fixture: ComponentFixture<DotDisplayComponent>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DotDisplayComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output framebuffer', () => {
    component.frameBuff = [...Array(16).fill(true), ...Array(48).fill(false)];
    fixture.detectChanges();

    expect(debugEl.queryAll(By.css('span.bg-gray-400')).length).toBe(48);
    expect(debugEl.queryAll(By.css('span.bg-gray-900')).length).toBe(16);
  });
});
