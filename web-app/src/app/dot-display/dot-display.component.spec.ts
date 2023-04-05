import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotDisplayComponent } from './dot-display.component';

describe('DotDisplayComponent', () => {
  let component: DotDisplayComponent;
  let fixture: ComponentFixture<DotDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
