import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import * as moment from "moment";

import { AppointmentDeclineComponent } from './appointment-decline.component';

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { SeriesId } from "../../../types/aliases/series-id";

class MockAppointmentService {
  getAppointmentData(appointmentId: TimespanId): Observable<Appointment> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          }
        });
      }

      if (appointmentId === 'IdWithStartAndEndNull') {
        observer.next({
          id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
          start: null,
          end: null,
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
            autoAcceptBookings: true,
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3,
          },
        });
        return;
      }

      const appointment: Appointment = {
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
          autoAcceptBookings: true,
        },
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
      };

      observer.next(appointment);
    });
  }

  declineAppointmentRequest(appointmentId: TimespanId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      observer.next();
    });
  }

  declineAppointmentSeriesRequest(seriesId: SeriesId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      observer.next();
    });
  }
}

describe('AppointmentDeclineComponent method calls', () => {
  let component: AppointmentDeclineComponent;
  let fixture: ComponentFixture<AppointmentDeclineComponent>;
  let declineAppointmentMethod: jasmine.Spy<any>;
  let declineAppointmentSeriesMethod: jasmine.Spy<any>;
  let getAppointmentDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentDeclineComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AppointmentService, useClass: MockAppointmentService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDeclineComponent);
    component = fixture.componentInstance;
    declineAppointmentMethod = spyOn(component, 'declineAppointment');
    declineAppointmentMethod.calls.reset();
    declineAppointmentSeriesMethod = spyOn(component, 'declineAppointmentSeries');
    declineAppointmentSeriesMethod.calls.reset();
    getAppointmentDataMethod = spyOn(component, 'getAppointmentData');
    getAppointmentDataMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get appointment to init page', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(getAppointmentDataMethod).toHaveBeenCalled();
  }));
});

describe('AppointmentdeclineComponent', () => {
  let component: AppointmentDeclineComponent;
  let fixture: ComponentFixture<AppointmentDeclineComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentDeclineComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AppointmentService, useClass: MockAppointmentService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDeclineComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should set attributes to correct values after ngOnInit', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";

    const testAppointment: Appointment = {
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
        autoAcceptBookings: true,
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3,
      },
    };

    component.ngOnInit();
    tick();

    expect(component.appointment).toEqual(testAppointment);
    expect(component.appointment.start).toEqual(testAppointment.start);
    expect(component.appointment.end).toEqual(testAppointment.end);
    expect(component.appointmentDeclineForm.controls['user'].value)
      .toEqual(testAppointment.user.firstName + ' ' + testAppointment.user.lastName);
    expect(component.appointmentDeclineForm.controls['room'].value).toEqual(testAppointment.room.name);
    expect(component.appointmentDeclineForm.controls['date'].value)
      .toEqual(testAppointment.start?.format('DD.MM.YYYY'));
    expect(component.appointmentDeclineForm.controls['startHour'].value)
      .toEqual(testAppointment.start?.format('HH:mm'));
    expect(component.appointmentDeclineForm.controls['endHour'].value)
      .toEqual(testAppointment.end?.format('HH:mm'));
    expect(component.appointmentDeclineForm.controls['timeSlotRecurrence'].value)
      .toEqual(testAppointment.timeSlotRecurrence);
  }));

  it('should decline a pending appointment', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";

    component.getAppointmentData();
    tick();

    let closeModal = spyOn(component.activeModal, 'close');

    component.declineAppointment()
    tick();

    expect(closeModal).toHaveBeenCalledWith('declined');
  }));

  it('should decline a pending appointment series', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";

    component.getAppointmentData();
    tick();

    let closeModal = spyOn(component.activeModal, 'close');

    component.declineAppointmentSeries()
    tick();

    expect(closeModal).toHaveBeenCalledWith('declined');
  }));

  it('should show error message on get appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getAppointmentData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on decline appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.declineAppointment();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on decline appointment series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.declineAppointmentSeries();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));
});
