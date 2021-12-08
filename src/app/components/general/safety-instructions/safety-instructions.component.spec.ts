import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyInstructionsComponent } from './safety-instructions.component';

describe('SafetyInstructionsComponent', () => {
  let component: SafetyInstructionsComponent;
  let fixture: ComponentFixture<SafetyInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
