import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppointmentEditComponent} from './appointment-edit.component';
import {TimespanId} from "../../../types/aliases/timespan-id";
import {Observable} from "rxjs";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {SeriesId} from "../../../types/aliases/series-id";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppointmentService} from "../../../services/appointment.service";
import {Room} from "../../../types/room";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";


class MockAppointmentService {
  public getAppointmentData(appointmentId: TimespanId): Observable<Appointment> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            }
          }
        });
      }

      const appointmentSeries: Appointment = {

        id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
        start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 1,
        seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
        amount: 4,
        timeSlotRecurrence: 3,
        confirmationStatus: 2,
        maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        },
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        }
      }

      const appointment: Appointment = {

        id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a52",
        start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 1,
        seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
        amount: 1,
        timeSlotRecurrence: 1,
        confirmationStatus: 2,
        maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        },
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        }
      }
      if (appointmentId === "c3a70a44-374c-46a9-be05-a3f6ef4e39a52") {
        observer.next(appointment);
      } else {
        observer.next(appointmentSeries);
      }
    });
  }

  editAppointment(
    room: Room, start: moment.Moment, end: moment.Moment
  ): Observable<Appointment> {
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
      const appointment: Appointment = {

        id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
        start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 1,
        seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
        amount: 1,
        timeSlotRecurrence: 1,
        confirmationStatus: 1,
        maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        },
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        }
      }
      observer.next(appointment);
    });
  }

  editAppointmentSeries(room: Room,
                        start: moment.Moment,
                        end: moment.Moment,
                        timeSlotRecurrence: TimeSlotRecurrence,
                        amount: number,
                        force: boolean): Observable<Appointment[]> {
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
      const appointments: Appointment[] = [
        {
          id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
          start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
          start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
      observer.next(appointments);
    });
  }
}

describe('AppointmentEditComponent method calls', () => {
  let component: AppointmentEditComponent;
  let fixture: ComponentFixture<AppointmentEditComponent>;
  let editAppointmentMethod: jasmine.Spy<any>;
  let editAppointmentSeriesMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentEditComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: AppointmentService, useClass: MockAppointmentService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentEditComponent);
    component = fixture.componentInstance;
    editAppointmentMethod = spyOn(component, 'editAppointment');
    editAppointmentMethod.calls.reset();
    editAppointmentSeriesMethod = spyOn(component, 'editAppointmentSeries');
    editAppointmentSeriesMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set component attributes when init page ', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.ngOnInit();
    tick();
    const testAppointment: Appointment = {
      id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
      start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      amount: 4,
      timeSlotRecurrence: 3,
      confirmationStatus: 2,
      maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    };
    expect(component.appointment).toEqual(testAppointment);
    expect(component.appointment.start).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.appointment.end).toEqual(moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.date).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.dateText).toEqual("14.02.2022");
    expect(component.dateField.day).toEqual(14);
    expect(component.dateField.month).toEqual(2);
    expect(component.dateField.year).toEqual(2022);
    expect(+component.appointmentEditForm.controls['startHour'].value).toEqual(13);
    expect(+component.appointmentEditForm.controls['endHour'].value).toEqual(16);
    expect(+component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].value).toEqual(TimeSlotRecurrence.weekly);
    expect(+component.recurringAppointmentEditForm.controls['amount'].value).toEqual(4);
    expect(component.isRecurring).toEqual(true);
  }));

  /*it('should call setDateMethod with current date', fakeAsync(() => {
    let setDateMethod = spyOn(component, 'setDate');
    component.ngOnInit();
    tick();
    expect(setDateMethod).toHaveBeenCalledWith(moment(undefined));
  }));*/

  it('should handle change of datepicker', fakeAsync(() => {
    component.dateField.year = 2022;
    component.dateField.month = 4;
    component.dateField.day = 8;
    let setDateMethod = spyOn(component, 'setDate');
    component.handleDatepickerChange();

    expect(setDateMethod).toHaveBeenCalledWith(moment(`${component.dateField.year}-${component.dateField.month}-${component.dateField.day}`));
  }));

  it('should edit appointment', fakeAsync(() => {
    component.isRecurring = false;
    component.ngOnInit();
    tick();
    component.editAppointment();
    tick();
    expect(editAppointmentMethod).toHaveBeenCalled();
  }));

  it('should edit appointment series', fakeAsync(() => {
    component.isRecurring = true;
    component.ngOnInit();
    component.editAppointmentSeries();
    expect(editAppointmentSeriesMethod).toHaveBeenCalled();
  }));
});

describe('AppointmentEditComponent', () => {
  let component: AppointmentEditComponent;
  let fixture: ComponentFixture<AppointmentEditComponent>;
  //let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentEditComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: AppointmentService, useClass: MockAppointmentService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentEditComponent);
    component = fixture.componentInstance;
    /*consoleError = spyOn(console, 'error');
    consoleError.calls.reset();*/
  });


  it('should set attributes correctly when set date is called', fakeAsync(() => {
    component.appointment.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    component.setDate(component.appointment.start);

    tick();
    expect(component.date).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.dateText).toEqual("14.02.2022");
    expect(component.dateField.day).toEqual(14);
    expect(component.dateField.month).toEqual(2);
    expect(component.dateField.year).toEqual(2022);
  }));

  it('should edit appointment', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.ngOnInit();
    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.appointmentEditForm.controls['endHour'].setValue(17);
    component.appointmentEditForm.controls['endHour'].markAsDirty();


    tick();
    component.editAppointment();
    tick();
    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should edit appointment series', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    component.ngOnInit();
    component.force = true;
    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();
    tick();
    component.editAppointmentSeries();
    tick();
    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle edit appointment with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.ngOnInit();
    component.appointmentEditForm.controls['endHour'].setValue(24);
    component.appointmentEditForm.controls['endHour'].markAsDirty();

    tick();
    component.editAppointment();
    tick();
    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle edit appointment series with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    component.ngOnInit();
    component.force = true;
    component.appointmentEditForm.controls['endHour'].setValue(24);
    component.appointmentEditForm.controls['endHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();
    tick();
    component.editAppointmentSeries();
    tick();
    expect(closeForm).toHaveBeenCalledWith(true);
  }));


  it('should show error message on edit appointment series booking conflict error', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    localStorage.setItem('throwTimeSlotConflictError', 'true');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";
    component.ngOnInit();
    component.force = true;
    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();

    tick();
    component.editAppointmentSeries();
    tick();
    expect(closeForm).not.toHaveBeenCalled();
    expect(component.seriesConflict).toEqual(true);

    localStorage.setItem('throwTimeSlotConflictError', 'false');
  }));

  it('should show error message on edit appointment booking conflict error', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    localStorage.setItem('throwTimeSlotConflictError', 'true');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";
    component.ngOnInit();
    tick();

    component.appointmentEditForm.controls['startHour'].setValue(5);
    component.appointmentEditForm.controls['startHour'].markAsDirty();


    component.editAppointment();
    tick();
    expect(closeForm).not.toHaveBeenCalled();
    expect(component.timeslotConflict).toEqual(true);
    expect(component.timeslotConflictMessage).toEqual('Your booking conflicts with to many other bookings.');
    localStorage.setItem('throwTimeSlotConflictError', 'false');
  }));

  it('should show error message on get appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');
    let consoleError = spyOn(console, 'error');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";
    component.getAppointmentData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
