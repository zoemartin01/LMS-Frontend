import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxPaginationModule} from "ngx-pagination";

import {AdminAppointmentListComponent} from './admin-appointment-list.component';
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {Observable} from "rxjs";
import {PagedResponse} from "../../../types/paged-response";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {AppointmentService} from "../../../services/appointment.service";
import {PagedList} from "../../../types/paged-list";
import {Message} from "../../../types/message";


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

      const pendingAppointments: PagedResponse<Appointment> = {
          total: 5,
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
        }
      ;

      const acceptedAppointments: PagedResponse<Appointment> =
        {
          total: 2,
          data:
            [
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
        };
      const deniedAppointments: PagedResponse<Appointment> = {
        total: 1,
        data: [
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 3,
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
          }]
      };

      if (confirmationStatus == ConfirmationStatus.pending) {
        observer.next(pendingAppointments);
      } else if (confirmationStatus == ConfirmationStatus.accepted) {
        observer.next(acceptedAppointments);
      } else if (confirmationStatus == ConfirmationStatus.denied) {
        observer.next(deniedAppointments);
      } else {
        observer.next(undefined);
      }
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
          maxStart: undefined,
          amount: 1,
          confirmationStatus: ConfirmationStatus.unknown,
        },
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('AdminAppointmentListComponent', () => {
  let component: AdminAppointmentListComponent;
  let fixture: ComponentFixture<AdminAppointmentListComponent>;
  let consoleError: jasmine.Spy<any>;
  let getPendingAppointmentsMethod: jasmine.Spy<any>;
  let getAcceptedAppointmentsMethod: jasmine.Spy<any>;
  let getDeniedAppointmentsMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: AppointmentService, useClass: MockAppointmentService},
        {provide: NgbModal, useClass: MockModalService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAppointmentListComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
    getPendingAppointmentsMethod = spyOn(component, 'getPendingAppointments');
    getPendingAppointmentsMethod.calls.reset();
    getAcceptedAppointmentsMethod = spyOn(component, 'getAcceptedAppointments');
    getAcceptedAppointmentsMethod.calls.reset();
    getDeniedAppointmentsMethod = spyOn(component, 'getDeniedAppointments');
    getDeniedAppointmentsMethod.calls.reset();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all pending, accepted and declined appointments', fakeAsync(() => {
    component.ngOnInit();

    tick();

    expect(getPendingAppointmentsMethod).toHaveBeenCalled();
    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();
    expect(getDeniedAppointmentsMethod).toHaveBeenCalled();
  }));

  it('should get all pending appointments', fakeAsync(() => {
    let pagedListPendingAppointments = new PagedList<Appointment>();
    pagedListPendingAppointments.pageSize = 10;
    component.pendingAppointments.pageSize = 10;
    component.getPendingAppointments();
    tick();

    pagedListPendingAppointments.data = [
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
    ];

    tick();
    //@TODO component.pendingAppointments empty :(
    expect(component.pendingAppointments).toEqual(pagedListPendingAppointments);

    expect(getPendingAppointmentsMethod).toHaveBeenCalled();
  }));

  it('should get all accepted appointments', fakeAsync(() => {
    component.getAcceptedAppointments();
    tick();

    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();
  }));

  it('should get all denied appointments', fakeAsync(() => {
    component.getDeniedAppointments();
    tick();

    expect(getDeniedAppointmentsMethod).toHaveBeenCalled();
  }));


  it('should update accepted appointments when accepted appointment is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openAppointmentDeletionDialog(
      "c3a70a44-374c-46a9-be05-a3f6ef4e39a5"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update accepted appointments when accepted appointment deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentDeletionDialog(
      "c3a70a44-374c-46a9-be05-a3f6ef4e39a5"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update declined appointments when declined appointment is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openAppointmentDeletionDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getDeniedAppointmentsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update declined appointments when declined appointment deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentDeletionDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getDeniedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update pending and accepted appointments when pending appointment is accepted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'accepted');

    component.openAppointmentAcceptDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getPendingAppointmentsMethod).toHaveBeenCalled();
    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update pending and accepted appointments when appointment acceptation is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentAcceptDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getPendingAppointmentsMethod).not.toHaveBeenCalled();
    expect(getAcceptedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update pending and declined appointments when pending appointment is declined', fakeAsync(() => {
    localStorage.setItem('returnVal', 'accepted');

    component.openAppointmentDeclineDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getPendingAppointmentsMethod).toHaveBeenCalled();
    expect(getDeniedAppointmentsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update pending and declined appointments when appointment decline is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentDeclineDialog(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getPendingAppointmentsMethod).not.toHaveBeenCalled();
    expect(getDeniedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update accepted appointments when accepted appointment is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.openAppointmentView(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();
    localStorage.removeItem('returnVal');
  }));

  it('should not update accepted appointments when accepted appointment is viewed and not dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentView(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update declined appointments when declined appointment is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.openAppointmentView(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getDeniedAppointmentsMethod).toHaveBeenCalled();
    localStorage.removeItem('returnVal');
  }));

  it('should not update declined appointments when declined appointment is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentView(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getDeniedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update accepted and pending appointments when appointment is created', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created');

    component.openAppointmentCreationForm();

    tick();

    expect(getPendingAppointmentsMethod).toHaveBeenCalled();
    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();
    localStorage.removeItem('returnVal');
  }));

  it('should not update accepted and pending appointments when appointment creation is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentCreationForm();

    tick();

    expect(getPendingAppointmentsMethod).not.toHaveBeenCalled();
    expect(getAcceptedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update accepted appointments when appointment is edited', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    component.openAppointmentEditForm(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).toHaveBeenCalled();
    localStorage.removeItem('returnVal');
  }));

  it('should not update accepted appointments when appointment edit is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentEditForm(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76"
    );

    tick();

    expect(getAcceptedAppointmentsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

//@TODO Doesnt work
  /*it('should show error message on get pending appointments error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getPendingAppointments();
    tick();
    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));*/
});
