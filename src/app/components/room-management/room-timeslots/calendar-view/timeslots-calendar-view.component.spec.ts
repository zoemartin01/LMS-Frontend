import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsCalendarViewComponent } from './timeslots-calendar-view.component';

describe('TimeslotsCalendarViewComponent', () => {
  let component: TimeslotsCalendarViewComponent;
  let fixture: ComponentFixture<TimeslotsCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotsCalendarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotsCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
