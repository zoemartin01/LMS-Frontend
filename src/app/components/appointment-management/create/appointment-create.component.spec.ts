import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import * as moment from "moment";

import { AppointmentCreateComponent } from './appointment-create.component';

import { AppointmentService } from "../../../services/appointment.service";

import { Room } from "../../../types/room";
import { TimeSlotRecurrence } from "../../../types/enums/timeslot-recurrence";

class MockAppointmentService {
  createAppointment(
    room: Room, start: moment.Moment, end: moment.Moment
  ): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          }
        });
      }

      if (localStorage.getItem('throwTimeSlotConflictError') === 'true') {
        observer.error({
          status: 409,
          error: {
            message: 'Your booking conflicts with to many other bookings.',
          }
        });
      }

      observer.next();
    });
  }

  createAppointmentSeries(room: Room,
                          start: moment.Moment,
                          end: moment.Moment,
                          timeSlotRecurrence: TimeSlotRecurrence,
                          amount: number,
                          force: boolean): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          }
        });
      }

      if (localStorage.getItem('throwTimeSlotConflictError') === 'true') {
        observer.error({
          status: 409,
          error: {}
        });
      }

      observer.next();
    });
  }
}

describe('AppointmentCreateComponent method calls', () => {
  let component: AppointmentCreateComponent;
  let fixture: ComponentFixture<AppointmentCreateComponent>;
  let createAppointmentMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentCreateComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
      ],
      providers: [
        { provide: AppointmentService, useClass: MockAppointmentService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentCreateComponent);
    component = fixture.componentInstance;
    createAppointmentMethod = spyOn(component, 'createAppointment');
    createAppointmentMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page with date and picked day time', fakeAsync(() => {
    component.date = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let setDateMethod = spyOn(component, 'setDate');

    component.ngOnInit();

    tick();

    expect(setDateMethod).toHaveBeenCalledWith(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(+component.appointmentCreateForm.controls['startHour'].value).toEqual(13);
    expect(+component.appointmentCreateForm.controls['endHour'].value).toEqual(14);
  }));

  it('should init page with date and picked day time with endhour 0', fakeAsync(() => {
    component.date = moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm');
    component.start = moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let setDateMethod = spyOn(component, 'setDate');

    component.ngOnInit();

    tick();

    expect(setDateMethod).toHaveBeenCalledWith(moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(+component.appointmentCreateForm.controls['startHour'].value).toEqual(23);
    expect(+component.appointmentCreateForm.controls['endHour'].value).toEqual(24);
  }));

  it('should call setDateMethod with current date', fakeAsync(() => {
    let setDateMethod = spyOn(component, 'setDate');

    component.ngOnInit();
    tick();

    expect(setDateMethod).toHaveBeenCalledWith(moment(undefined));
  }));

  it('should handle change of datepicker', fakeAsync(() => {
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');
    component.dateField.year = 2022;
    component.dateField.month = 4;
    component.dateField.day = 8;

    let setDateMethod = spyOn(component, 'setDate');

    component.handleDatepickerChange();

    expect(setDateMethod).toHaveBeenCalledWith(moment(`${component.dateField.year}-${component.dateField.month}-${component.dateField.day}`));
  }));
});

describe('AppointmentCreateComponent', () => {
  let component: AppointmentCreateComponent;
  let fixture: ComponentFixture<AppointmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentCreateComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
      ],
      providers: [
        { provide: AppointmentService, useClass: MockAppointmentService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentCreateComponent);
    component = fixture.componentInstance;
  });

  it('should set attributes correctly when set date is called', fakeAsync(() => {
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    component.setDate(component.start);

    tick();

    expect(component.date).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.dateText).toEqual("14.02.2022");
    expect(component.dateField.day).toEqual(14);
    expect(component.dateField.month).toEqual(2);
    expect(component.dateField.year).toEqual(2022);
  }));

  it('should create appointment', fakeAsync(() => {
    component.isRecurring = false;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.single);

    component.createAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should create appointment when endhour = 24', fakeAsync(() => {
    component.isRecurring = false;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.appointmentCreateForm.controls['endHour'].setValue(24);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.single);

    component.createAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should create appointment series', fakeAsync(() => {
    component.isRecurring = true;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.weekly);
    component.recurringAppointmentCreateForm.controls['amount'].setValue(2);

    component.createAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should create appointment series when endhour = 24', fakeAsync(() => {
    component.isRecurring = true;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.appointmentCreateForm.controls['endHour'].setValue(24);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.weekly);
    component.recurringAppointmentCreateForm.controls['amount'].setValue(2);

    component.createAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should show error message on accept appointment series booking conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.isRecurring = true;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.weekly);
    component.recurringAppointmentCreateForm.controls['amount'].setValue(2);

    component.createAppointment();
    tick();

    expect(closeForm).not.toHaveBeenCalled();
    expect(component.seriesConflict).toEqual(true);

    localStorage.setItem('throwTimeSlotConflictError', 'false');
  }));

  it('should show error message on accept appointment booking conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.isRecurring = false;
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentCreateForm.controls['safetyInstructions'].setValue(true);
    component.appointmentCreateForm.controls['hwlabRules'].setValue(true);
    component.recurringAppointmentCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.single);

    component.createAppointment();
    tick();

    expect(closeForm).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Your booking conflicts with to many other bookings.');

    localStorage.setItem('throwTimeSlotConflictError', 'false');
  }));

  it('should handle invalid input', fakeAsync(() => {
    component.createAppointment();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));
});
