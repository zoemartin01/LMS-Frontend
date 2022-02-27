import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";
import * as moment from "moment";

import { PersonalAppointmentListComponent } from './personal-appointment-list.component';

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { PagedList } from "../../../types/paged-list";
import { PagedResponse } from "../../../types/paged-response";

class MockAppointmentService {
  public getAllAppointmentsForCurrentUser(): Observable<PagedResponse<Appointment>> {
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

describe('PersonalAppointmentListComponent method calls', () => {
  let component: PersonalAppointmentListComponent;
  let fixture: ComponentFixture<PersonalAppointmentListComponent>;
  let consoleError: jasmine.Spy<any>;
  let getAllAppointmentsForCurrentUserMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PersonalAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: AppointmentService, useClass: MockAppointmentService },
        { provide: NgbModal, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalAppointmentListComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
    getAllAppointmentsForCurrentUserMethod = spyOn(component, 'getAllAppointmentsForCurrentUser');
    getAllAppointmentsForCurrentUserMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all pending, accepted and declined appointments for current user', fakeAsync(() => {
    component.ngOnInit();

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).toHaveBeenCalled();
  }));

  it('should update appointments when appointment is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openAppointmentDeletionDialog("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update appointments when appointment deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentDeletionDialog("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update appointments when appointment is created', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created');

    component.openAppointmentCreationForm();

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update appointments when appointment creation is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentCreationForm();

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update appointments when appointment is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.openAppointmentView("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update appointments when appointment is viewed and not dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openAppointmentView("3f7af855-ad57-4a4c-81e7-769ba90f9e76");

    tick();

    expect(getAllAppointmentsForCurrentUserMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('PersonalAppointmentListComponent method calls', () => {
  let component: PersonalAppointmentListComponent;
  let fixture: ComponentFixture<PersonalAppointmentListComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PersonalAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: AppointmentService, useClass: MockAppointmentService },
        { provide: NgbModal, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalAppointmentListComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should get all appointments', fakeAsync(() => {
    component.appointments.pageSize = 10;

    component.getAllAppointmentsForCurrentUser();

    tick();

    let pagedListAppointments = new PagedList<Appointment>();
    pagedListAppointments.pageSize = 10;
    pagedListAppointments.total = 8;
    pagedListAppointments.data = [
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
    ];

    expect(component.appointments).toEqual(pagedListAppointments);
  }));

  it('should show error message on get appointments error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getAllAppointmentsForCurrentUser();

    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
