import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Observable } from "rxjs";
import * as moment from "moment";

import { RoomCalendarViewComponent } from './room-calendar-view.component';

import { RoomService } from "../../../services/room.service";

import { Appointment } from "../../../types/appointment";
import { Room } from "../../../types/room";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { PagedResponse } from "../../../types/paged-response";

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private _testParams: object = {};

  get testParams() {
    return this._testParams;
  }

  set testParams(params: object) {
    this._testParams = params;
    this.subject.next(params);
  }
}

class MockRoomService {
  getRoomsData(limit: number = 0, offset: number = 0): Observable<PagedResponse<Room>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown error.',
            }
          }
        });
      }

      const pagedResponse: PagedResponse<Room> = {
        total: 3,
        data: [
          {
            "id": "2f1dd587-8625-4b9f-995c-f35e6a9997e9",
            "name": "Bacon",
            "description": "Quaerat et quia deleniti.",
            "maxConcurrentBookings": 1,
            "autoAcceptBookings": true,
          },
          {
            "id": "afbb3847-99d4-4798-9648-72ce15b2f951",
            "name": "Keyboard",
            "description": "Commodi a consequatur in sapiente et.",
            "maxConcurrentBookings": 1,
            "autoAcceptBookings": true,
          },
          {
            "id": "c8456ea3-91c2-4e57-893c-991e2fa27a26",
            "name": "Eggs",
            "description": "Eddible ellipsoids",
            "maxConcurrentBookings": 6,
            "autoAcceptBookings": true,
          },
        ]
      };

      observer.next(pagedResponse);
    });
  }

  getRoomCalendar(): Observable<{ calendar: (Appointment|string|null)[][][], minTimeslot: number }> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown error.',
            }
          }
        });
      }

      const calendar: (Appointment|string|null)[][][] = [
        [["unavailable"],["available"],["unavailable"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],[
          {
            id: "410cda0c-1027-4681-b578-61e3822534bc",
            start: moment("2022-01-28T09:00:00.000Z"),
            end: moment("2022-01-28T12:00:00.000Z"),
            type: 1,
            confirmationStatus: 2,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }],["unavailable"],["unavailable"]],
        [["available"],["available"],[
          {
            id: "5da3a161-7433-422b-b5ee-8375832d1eff",
            start: moment("2022-01-26T10:00:00.000Z"),
            end: moment("2022-01-26T13:00:00.000Z"),
            type: 1,
            confirmationStatus: 1,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }],["available"],[null],["unavailable"],["unavailable"]],
        [["unavailable"],["available"],[null],["available"],[null],["unavailable"],["unavailable"]],
        [["available"],["available"],[null],["available"],[null],["unavailable"],["unavailable"]],
        [["available"],["available"],[null],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["unavailable"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["unavailable"],["unavailable"],["unavailable"]],
      ];

      observer.next({ calendar, minTimeslot: 9 });
    });
  }

  getRoomData(roomId: string): Observable<Room> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown error.',
            }
          }
        });
      }

      observer.next({
        "id": roomId,
        "name": "Bacon",
        "description": "Quaerat et quia deleniti.",
        "maxConcurrentBookings": 2,
        "autoAcceptBookings": true,
      });
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

describe('RoomCalendarViewComponent - regular methods', () => {
  let component: RoomCalendarViewComponent;
  let fixture: ComponentFixture<RoomCalendarViewComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        RoomCalendarViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCalendarViewComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');

    consoleError.calls.reset();
    mockActivatedRoute.testParams = {};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page with params', () => {
    mockActivatedRoute.testParams = {
      id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
      date: '2022-02-26',
    };

    const getRoomsMethod = spyOn(component, 'getRooms');
    const changeRoomMethod = spyOn(component, 'changeRoom');
    const setWeekMethod = spyOn(component, 'setWeek');

    component.ngOnInit();

    expect(getRoomsMethod).toHaveBeenCalled();
    expect(changeRoomMethod).toHaveBeenCalledWith('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(setWeekMethod).toHaveBeenCalled();
  });

  it('should init page without params', () => {
    mockActivatedRoute.testParams = {};

    const getRoomsMethod = spyOn(component, 'getRooms');
    const updateCalendarMethod = spyOn(component, 'updateCalendar');
    const setWeekMethod = spyOn(component, 'setWeek');

    component.ngOnInit();

    expect(getRoomsMethod).toHaveBeenCalled();
    expect(component.room.id).toBeNull();
    expect(updateCalendarMethod).not.toHaveBeenCalled();
    expect(setWeekMethod).toHaveBeenCalled();
  });

  it('should set a week', () => {
    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.setWeek(moment("2022-01-01"));

    expect(component.week.unix()).toEqual(1640559600);
    expect(component.weekText).toBe('27.12.2021 - 02.01.2022');
    expect(component.weekField.day).toBe(27);
    expect(component.weekField.month).toBe(12);
    expect(component.weekField.year).toBe(2021);

    expect(updateCalendarMethod).toHaveBeenCalled();
  });

  it('should handle change of datepicker', () => {
    const setWeekMethod = spyOn(component, 'setWeek');

    component.weekField.day = 1;
    component.weekField.month = 1;
    component.weekField.year = 2022;

    component.handleDatepickerChange();

    expect(setWeekMethod).toHaveBeenCalledWith(moment("2022-1-1"));
  });

  it('should do nothing if room id is not set', () => {
    component.room.id = null;

    component.updateCalendar();

    expect(component.calendar).toEqual([]);
    expect(component.minTimeslot).toBe(0);
  });

  it('should show error when calendar update fails', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';

    component.updateCalendar();

    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should show error when getting rooms fails', () => {
    localStorage.setItem('throwError', 'true');

    component.getRooms();

    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  });

  it('should change room id', fakeAsync(() => {
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';

    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.changeRoom('a84f7b38-b78e-4e32-bff3-cfe3f263dba1');

    tick();

    expect(component.room.id).toBe('a84f7b38-b78e-4e32-bff3-cfe3f263dba1');
    expect(component.columnKeys).toEqual([0, 1]);
    expect(updateCalendarMethod).toHaveBeenCalled();
  }));

  it('should do nothing when trying to change room id to current', fakeAsync(() => {
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';
    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.changeRoom('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    tick();

    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(component.columnKeys).toEqual([0]);
    expect(updateCalendarMethod).not.toHaveBeenCalled();
  }));

  it('should show error when trying to get room data after room change', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';
    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.changeRoom('a84f7b38-b78e-4e32-bff3-cfe3f263dba1');

    tick();

    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(component.columnKeys).toEqual([0]);
    expect(updateCalendarMethod).not.toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should return specified day of week', () => {
    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(0).toISOString()).toBe("2022-01-07T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(1).toISOString()).toBe("2022-01-01T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(2).toISOString()).toBe("2022-01-02T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(3).toISOString()).toBe("2022-01-03T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(4).toISOString()).toBe("2022-01-04T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(5).toISOString()).toBe("2022-01-05T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(6).toISOString()).toBe("2022-01-06T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(7).toISOString()).toBe("2022-01-07T00:00:00.000Z");

    component.week = moment("2022-01-01T00:00:00.000Z");
    expect(component.getDayOfWeek(47).toISOString()).toBe("2022-01-05T00:00:00.000Z");
  });

  it('should check if object is a string', () => {
    expect(component.isString({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 2,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeFalse();
    expect(component.isString('')).toBeTrue();
    expect(component.isString(null)).toBeFalse();
  });

  it('should check if object is an appointment', () => {
    expect(component.isAppointment({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 2,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeTrue();
    expect(component.isAppointment('')).toBeFalse();
    expect(component.isAppointment(null)).toBeFalse();
  });

  it('should check if appointment was confirmed', () => {
    expect(component.isConfirmed({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 0,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeFalse();
    expect(component.isConfirmed({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 1,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeFalse();
    expect(component.isConfirmed({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 2,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeTrue();
    expect(component.isConfirmed({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 3,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBeFalse();
  });

  it('should parse object as appointment', () => {
    const appointment = {
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 3,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    };

    expect(component.parseAppointment(appointment)).toEqual(appointment);
  });

  it('should parse object as appointment', () => {
    expect(typeof component.parseString("kldjgkjlrkjlfdgkjldfgkjl")).toEqual("string");
  });

  it('should return id of appointment', () => {
    expect(component.getAppointmentId({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 3,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBe("410cda0c-1027-4681-b578-61e3822534bc");
  });

  it('should return rowspan for appointment', () => {
    expect(component.getRowspan({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 3,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: null,
      amount: 1,
      room: {
        id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
        name: "algorithms",
        description: "Quidem laudantium deleniti eum.",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false
      },
      user: {
        id: "540618e7-98c8-4830-8917-0f52787360d6",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    })).toBe(3);
  });

  it('should open appointment creation form', () => {
    component.week = moment("2022-02-07").hours(0).minutes(0).seconds(0).milliseconds(0);
    component.minTimeslot = 9;

    component.action = '';
    component.appointmentCreationStart = null;

    component.openAppointmentCreationForm(3,5);

    expect(component.action).toBe('create');
    expect(component.appointmentCreationStart).not.toBeNull();
  });

  it('should try to open appointment creation form when sidebar is already open', () => {
    component.action = 'edit';
    component.currentAppointmentId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openAppointmentCreationForm(3,5);

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should open appointment view', () => {
    component.action = '';
    component.currentAppointmentId = '';

    component.openAppointmentView('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('view');
    expect(component.currentAppointmentId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  it('should try to open appointment view when sidebar is already open', () => {
    component.action = 'edit';
    component.currentAppointmentId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openAppointmentView('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should open appointment edit form', () => {
    component.action = '';
    component.currentAppointmentId = '';

    component.openAppointmentEditForm('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  it('should try to open appointment edit form when sidebar is already open', () => {
    component.action = 'edit';
    component.currentAppointmentId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openAppointmentEditForm('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should close sidebar and update calendar', () => {
    component.action = 'edit';
    component.currentAppointmentId = 'bla';
    component.appointmentCreationStart = moment("2022-01-28T09:00:00.000Z");

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('bla');
    expect(component.appointmentCreationStart.toISOString()).toBe(moment("2022-01-28T09:00:00.000Z").toISOString());

    component.closeSidebar(true);

    expect(component.action).toBe('');
    expect(component.currentAppointmentId).toBe('');
    expect(component.appointmentCreationStart).toBeNull();
  });

  it('should open appointment deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.openAppointmentDeletionDialog("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(updateCalendarMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open appointment accept dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'accepted');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.acceptAppointmentRequest("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(updateCalendarMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open appointment decline dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'declined');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.declineAppointmentRequest("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(updateCalendarMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('RoomCalendarViewComponent - http methods', () => {
  let component: RoomCalendarViewComponent;
  let fixture: ComponentFixture<RoomCalendarViewComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        RoomCalendarViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCalendarViewComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');

    consoleError.calls.reset();
    mockActivatedRoute.testParams = {};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update calendar if room id is set', (done: DoneFn) => {
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';

    component.updateCalendar().then(() => {

      const calendar: (Appointment|string|null)[][][] = [
        [["unavailable"],["available"],["unavailable"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],[
          {
            id: "410cda0c-1027-4681-b578-61e3822534bc",
            start: moment("2022-01-28T09:00:00.000Z"),
            end: moment("2022-01-28T12:00:00.000Z"),
            type: 1,
            confirmationStatus: 2,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }],["unavailable"],["unavailable"]],
        [["available"],["available"],[
          {
            id: "5da3a161-7433-422b-b5ee-8375832d1eff",
            start: moment("2022-01-26T10:00:00.000Z"),
            end: moment("2022-01-26T13:00:00.000Z"),
            type: 1,
            confirmationStatus: 1,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }],["available"],[null],["unavailable"],["unavailable"]],
        [["unavailable"],["available"],[null],["available"],[null],["unavailable"],["unavailable"]],
        [["available"],["available"],[null],["available"],[null],["unavailable"],["unavailable"]],
        [["available"],["available"],[null],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["available"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["unavailable"],["unavailable"],["unavailable"]],
        [["available"],["available"],["available"],["available"],["unavailable"],["unavailable"],["unavailable"]],
      ];

      expect(component.calendar).toEqual(calendar);
      expect(component.minTimeslot).toBe(9);

      done();
    });
  });

  it('should get rooms', fakeAsync(() => {
    expect(component.rooms).toEqual([]);

    component.getRooms();

    tick();

    expect(component.rooms).toEqual([
      {
        "id": "2f1dd587-8625-4b9f-995c-f35e6a9997e9",
        "name": "Bacon",
        "description": "Quaerat et quia deleniti.",
        "maxConcurrentBookings": 1,
        "autoAcceptBookings": true,
      },
      {
        "id": "afbb3847-99d4-4798-9648-72ce15b2f951",
        "name": "Keyboard",
        "description": "Commodi a consequatur in sapiente et.",
        "maxConcurrentBookings": 1,
        "autoAcceptBookings": true,
      },
      {
        "id": "c8456ea3-91c2-4e57-893c-991e2fa27a26",
        "name": "Eggs",
        "description": "Eddible ellipsoids",
        "maxConcurrentBookings": 6,
        "autoAcceptBookings": true,
      },
    ]);
  }));
});
