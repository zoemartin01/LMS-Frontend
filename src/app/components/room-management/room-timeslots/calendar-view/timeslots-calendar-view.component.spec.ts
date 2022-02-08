import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsCalendarViewComponent } from './timeslots-calendar-view.component';

describe('TimeslotsCalendarViewComponent', () => {
  let component: TimeslotsCalendarViewComponent;
  let fixture: ComponentFixture<TimeslotsCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotsCalendarViewComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsCalendarViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
