import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {AppointmentAcceptComponent} from './appointment-accept.component';
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {Observable} from "rxjs";
import {PagedResponse} from "../../../types/paged-response";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";

class MockAppointmentService {
  public getAllAppointments(limit: number = 0, offset: number = 0, confirmationStatus: ConfirmationStatus | undefined = undefined): Observable<PagedResponse<Appointment>> {
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
    });
  }
}

class MockModalService {
  close(): { componentInstance: { appointment: Appointment | null }, result: Promise<string> } {
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
          maxStart: undefined,
          amount: 1,
          confirmationStatus: ConfirmationStatus.unknown,
        },
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('AppointmentAcceptComponent', () => {
  let component: AppointmentAcceptComponent;
  let fixture: ComponentFixture<AppointmentAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentAcceptComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentAcceptComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
