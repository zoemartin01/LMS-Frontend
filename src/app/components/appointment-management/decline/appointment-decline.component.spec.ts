import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDeclineComponent } from './appointment-decline.component';

describe('AppointmentDeclineComponent', () => {
  let component: AppointmentDeclineComponent;
  let fixture: ComponentFixture<AppointmentDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
