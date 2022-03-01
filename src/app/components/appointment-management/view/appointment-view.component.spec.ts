import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppointmentViewComponent} from './appointment-view.component';
import {TimespanId} from "../../../types/aliases/timespan-id";
import {Observable} from "rxjs";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppointmentService} from "../../../services/appointment.service";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";

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
}

class MockModalService {
  open(): { componentInstance: { appointment: Appointment | null }, result: Promise<string> } {
    return {
      componentInstance: {
        appointment: {
          id: null,
          user: {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            role: UserRole.unknown,
            notificationChannel: NotificationChannel.unknown,
            emailVerification: true,
            isActiveDirectory: false,
          },
          room: {
            id: null,
            name: '',
            description: '',
            maxConcurrentBookings: 1,
            autoAcceptBookings: null,
          },
          start: null,
          end: null,
          type: RoomTimespanType.appointment,
          seriesId: null,
          timeSlotRecurrence: 1,
          maxStart: null,
          amount: 1,
          confirmationStatus: ConfirmationStatus.unknown,
        },
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('AppointmentViewComponent method calls', () => {
  let component: AppointmentViewComponent;
  let fixture: ComponentFixture<AppointmentViewComponent>;
  let viewAppointmentMethod: jasmine.Spy<any>;
  let viewAppointmentSeriesMethod: jasmine.Spy<any>;
  let getAppointmentDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentViewComponent,
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
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentViewComponent);
    component = fixture.componentInstance;
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

  it('should close when appointment is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');
    let closeForm = spyOn(component.closeForm, 'emit');
    component.openAppointmentDeletionDialog();
    tick();

    expect(closeForm).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update appointment when appointment is not deleted but dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');
    component.openAppointmentDeletionDialog();
    tick();

    expect(getAppointmentDataMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update appointment when appointment deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentDeletionDialog();

    tick();

    expect(getAppointmentDataMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('AppointmentViewComponent', () => {
  let component: AppointmentViewComponent;
  let fixture: ComponentFixture<AppointmentViewComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentViewComponent,
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

    fixture = TestBed.createComponent(AppointmentViewComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should show error message on get appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getAppointmentData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

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

    component.ngOnInit();
    tick();

    expect(component.appointment).toEqual(testAppointment);
    expect(component.appointment.start).toEqual(testAppointment.start);
    expect(component.appointment.end).toEqual(testAppointment.end);
    expect(component.appointmentViewForm.controls['user'].value).toEqual(testAppointment.user.firstName + ' ' + testAppointment.user.lastName);
    expect(component.appointmentViewForm.controls['room'].value).toEqual(testAppointment.room.name);
    expect(component.appointmentViewForm.controls['date'].value).toEqual(testAppointment.start?.format('DD.MM.YYYY'));
    expect(component.appointmentViewForm.controls['startHour'].value).toEqual(testAppointment.start?.format('HH:mm'));
    expect(component.appointmentViewForm.controls['endHour'].value).toEqual(testAppointment.end?.format('HH:mm'));
    expect(component.appointmentViewForm.controls['confirmationStatus'].value).toEqual(testAppointment.confirmationStatus);
    expect(component.appointmentViewForm.controls['timeSlotRecurrence'].value).toEqual(testAppointment.timeSlotRecurrence);

  }));

});
