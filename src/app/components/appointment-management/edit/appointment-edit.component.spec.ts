import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import * as moment from "moment";

import {AppointmentEditComponent} from './appointment-edit.component';

import {AppointmentService} from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { SeriesId } from "../../../types/aliases/series-id";
import { TimeSlotRecurrence } from "../../../types/enums/timeslot-recurrence";
import { Room } from "../../../types/room";
import { PagedResponse } from "../../../types/paged-response";

class MockAppointmentService {
  getAppointmentData(appointmentId: TimespanId): Observable<Appointment> {
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
        }];

      observer.next(appointments);
    });
  }

  getAllAppointmentsForSeries(
    seriesId : SeriesId,
    limit: number = 0,
    offset: number = 0): Observable<PagedResponse<Appointment>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          }
        });
      }

      const appointments: PagedResponse<Appointment> = {
        total: 8,
        data: [
          {
            id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
            start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 4,
            timeSlotRecurrence: 3,
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
          },
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 1,
            maxStart: null,
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
            amount: 4,
            timeSlotRecurrence: 3,
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
          },
          {
            id: "1415b732-328a-46a4-abcb-c1493252a9cc",
            start: moment("2022-02-28T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-28T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 4,
            timeSlotRecurrence: 3,
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
          },
          {
            id: "a229732c-32a3-4aee-b678-3b52f6b8a4a0",
            start: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-03-07T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 4,
            timeSlotRecurrence: 3,
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
          },
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
          },
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 3,
            maxStart: null,
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
        ]
      };

      observer.next(appointments);
      observer.complete();
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
        {provide: AppointmentService, useClass: MockAppointmentService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentEditComponent);
    component = fixture.componentInstance;
    editAppointmentMethod = spyOn(component, 'editAppointment');
    editAppointmentMethod.calls.reset();
    editAppointmentSeriesMethod = spyOn(component, 'editAppointmentSeries');
    editAppointmentSeriesMethod.calls.reset();
    component.dirtyDate = true;
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

  it('should handle change of datepicker', fakeAsync(() => {
    component.dateField.year = 2022;
    component.dateField.month = 4;
    component.dateField.day = 8;

    let setDateMethod = spyOn(component, 'setDate');

    component.handleDatepickerChange();

    expect(setDateMethod).toHaveBeenCalledWith(moment(`${component.dateField.year}-${component.dateField.month}-${component.dateField.day}`));
  }));
});

describe('AppointmentEditComponent', () => {
  let component: AppointmentEditComponent;
  let fixture: ComponentFixture<AppointmentEditComponent>;

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
        {provide: AppointmentService, useClass: MockAppointmentService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentEditComponent);
    component = fixture.componentInstance;
    component.dirtyDate = true;
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
    tick();

    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.appointmentEditForm.controls['endHour'].setValue(17);
    component.appointmentEditForm.controls['endHour'].markAsDirty();

    component.editAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should edit appointment series', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.force = true;
    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();

    component.editAppointmentSeries();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle edit appointment with end hour 24', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.appointmentEditForm.controls['endHour'].setValue(24);
    component.appointmentEditForm.controls['endHour'].markAsDirty();

    component.editAppointment();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle edit appointment series with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    component.ngOnInit();
    tick();

    component.force = true;
    component.appointmentEditForm.controls['endHour'].setValue(24);
    component.appointmentEditForm.controls['endHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();

    component.editAppointmentSeries();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));


  it('should show error message on edit appointment series booking conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.force = true;
    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].markAsDirty();
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();

    component.editAppointmentSeries();
    tick();

    expect(closeForm).not.toHaveBeenCalled();
    expect(component.seriesConflict).toEqual(true);

    localStorage.setItem('throwTimeSlotConflictError', 'false');
  }));

  it('should show error message on edit appointment booking conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    let closeForm = spyOn(component.closeForm, 'emit');

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

    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a52";

    let consoleError = spyOn(console, 'error');

    component.getAppointmentData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on appointment edit error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.appointmentEditForm.controls['endHour'].setValue(17);
    component.appointmentEditForm.controls['endHour'].markAsDirty();

    component.editAppointment();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on appointment series edit error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.appointmentEditForm.controls['startHour'].setValue(7);
    component.appointmentEditForm.controls['startHour'].markAsDirty();
    component.appointmentEditForm.controls['endHour'].setValue(17);
    component.recurringAppointmentEditForm.controls['amount'].setValue(2);
    component.recurringAppointmentEditForm.controls['amount'].markAsDirty();
    component.recurringAppointmentEditForm.controls['timeSlotRecurrence'].setValue(3);

    component.editAppointmentSeries();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should handle invalid input', fakeAsync(() => {
    component.editAppointment();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));

  it('should handle invalid input', fakeAsync(() => {
    component.editAppointmentSeries();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));
});
