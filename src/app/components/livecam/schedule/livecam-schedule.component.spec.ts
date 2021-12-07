import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecamScheduleComponent } from './livecam-schedule.component';

describe('ScheduleComponent', () => {
  let component: LivecamScheduleComponent;
  let fixture: ComponentFixture<LivecamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivecamScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
