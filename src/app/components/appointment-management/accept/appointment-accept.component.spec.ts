import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppointmentAcceptComponent} from './appointment-accept.component';
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {Observable} from "rxjs";
import {PagedResponse} from "../../../types/paged-response";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {AppointmentService} from "../../../services/appointment.service";
import {FormsModule, NgControl, ReactiveFormsModule} from "@angular/forms";
import {MessageId} from "../../../types/aliases/message-id";
import {TimespanId} from "../../../types/aliases/timespan-id";

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

  acceptAppointmentRequest(appointmentId: TimespanId): Observable<void> {
    return new Observable((observer) => {
      if (appointmentId === '312d8319-c253-4ee4-8771-a4a8d4a2f411') {
        observer.error({
          error: {
            error: {
              message: 'Appointment not found.',
            }
          }
        });
      }

      observer.next();
    });
  }
}

describe('AppointmentAcceptComponent', () => {
  let component: AppointmentAcceptComponent;
  let fixture: ComponentFixture<AppointmentAcceptComponent>;
  let acceptAppointmentMethod: jasmine.Spy<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentAcceptComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: AppointmentService, useClass: MockAppointmentService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentAcceptComponent);
    component = fixture.componentInstance;
    acceptAppointmentMethod = spyOn(component, 'acceptAppointment');
    acceptAppointmentMethod.calls.reset();

  });

  //@TODO dont really know what to test

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//@TODO not working yet
  it('should accept a pending appointment', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.getAppointmentData();
    tick();
    console.log(component.appointment);

    let closeModal = spyOn(component.activeModal, 'close');
    tick();
    component.acceptAppointment()
    tick();
    console.log(component.appointment.id);
    expect(acceptAppointmentMethod).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalledWith('accepted');
  }));
});
