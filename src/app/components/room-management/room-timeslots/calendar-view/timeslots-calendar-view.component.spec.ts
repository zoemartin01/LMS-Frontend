import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TimeslotsCalendarViewComponent } from './timeslots-calendar-view.component';

describe('TimeslotsCalendarViewComponent', () => {
  let component: TimeslotsCalendarViewComponent;
  let fixture: ComponentFixture<TimeslotsCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsCalendarViewComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
        RouterTestingModule,
      ],
      providers: [
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsCalendarViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
