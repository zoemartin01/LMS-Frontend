import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxPaginationModule} from "ngx-pagination";

import {AdminAppointmentListComponent} from './admin-appointment-list.component';
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {Observable} from "rxjs";
import {PagedResponse} from "../../../types/paged-response";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";


class MockAppointmentService {
  public getAllAppointments(limit: number = 0, offset: number = 0, confirmationStatus: ConfirmationStatus | undefined = undefined): Observable<PagedResponse<Appointment>> {
    if (localStorage.getItem('throwError') === 'true') {
      observer.error({
        error: {
          error: {
            message: 'Unknown Error.',
          }
        }
      });
    }

    const pendingAppointments: Appointment[] = [
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
          maxStart: undefined,
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
        }
      ]
    ;

    const acceptedAppointments: Appointment[];
    const deniedAppointments: Appointment[];


    if (confirmationStatus == ConfirmationStatus.pending) {
      observer.next(pendingAppointments);
    }
    if (confirmationStatus == ConfirmationStatus.accepted) {
      observer.next(acceptedAppointments);
    }
    if (confirmationStatus == ConfirmationStatus.denied) {
      observer.next(deniedAppointments);
    }
  }
}

class MockUserService {

}

describe('AdminAppointmentListComponent', () => {
  let component: AdminAppointmentListComponent;
  let fixture: ComponentFixture<AdminAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointmentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
