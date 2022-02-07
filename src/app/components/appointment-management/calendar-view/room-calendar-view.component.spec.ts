import { ComponentFixture, TestBed } from '@angular/core/testing';
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

class MockModalService {
  open(id: string): { componentInstance: { appointment: Appointment|null }, result: Promise<string> } {
    return {
      componentInstance: { appointment: null },
      result: new Promise<string>(resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

class MockRoomService {
  getRoomsData(): Observable<Room[]> {
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

      const rooms: Room[] = [
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
      ];

      observer.next(rooms);
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
            maxStart: undefined,
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
            maxStart: undefined,
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
        NgbActiveModal,
        { provide: RoomService, useClass: MockRoomService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgbModal, useValue: MockModalService },
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
    };

    const getRoomsMethod = spyOn(component, 'getRooms');
    const updateCalendarMethod = spyOn(component, 'updateCalendar');
    const setWeekMethod = spyOn(component, 'setWeek');

    component.ngOnInit();

    expect(getRoomsMethod).toHaveBeenCalled();
    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(updateCalendarMethod).toHaveBeenCalled();
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

  it('should show error when calendar update fails', () => {
    localStorage.setItem('throwError', 'true');
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';

    component.updateCalendar();

    expect(consoleError).toHaveBeenCalled();
  });

  it('should show error when getting rooms fails', () => {
    localStorage.setItem('throwError', 'true');

    component.getRooms();

    expect(consoleError).toHaveBeenCalled();
  });

  it('should change room id', () => {
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';
    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.changeRoom('a84f7b38-b78e-4e32-bff3-cfe3f263dba1');

    expect(component.room.id).toBe('a84f7b38-b78e-4e32-bff3-cfe3f263dba1');
    expect(updateCalendarMethod).toHaveBeenCalled();
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
      maxStart: undefined,
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
      maxStart: undefined,
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
      maxStart: undefined,
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
      maxStart: undefined,
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
      maxStart: undefined,
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
      maxStart: undefined,
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

  it('should return id of appointment', () => {
    expect(component.getAppointmentId({
      id: "410cda0c-1027-4681-b578-61e3822534bc",
      start: moment("2022-01-28T09:00:00.000Z"),
      end: moment("2022-01-28T12:00:00.000Z"),
      type: 1,
      confirmationStatus: 3,
      seriesId: null,
      timeSlotRecurrence: 1,
      maxStart: undefined,
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
      maxStart: undefined,
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

  it('should open appointment view', () => {
    component.action = '';
    component.currentAppointmentId = '';

    component.openAppointmentView('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('view');
    expect(component.currentAppointmentId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  it('should open appointment edit form', () => {
    component.action = '';
    component.currentAppointmentId = '';

    component.openAppointmentEditForm('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentAppointmentId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  //@todo Adrian add modal tests
  /*it('should open appointment deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.action = 'xxx';

    expect(component.action).toBe('xxx');

    let updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.openAppointmentDeletionDialog('410cda0c-1027-4681-b578-61e3822534bc');

    tick();

    expect(component.action).toBe('');
    expect(updateCalendarMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));*/
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
        NgbActiveModal,
        { provide: RoomService, useClass: MockRoomService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgbModal, useValue: MockModalService },
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
            maxStart: undefined,
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
            maxStart: undefined,
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

  it('should get rooms', () => {
    component.getRooms();

    const rooms: Room[] = [
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
    ];

    //expect(component.rooms).toEqual(rooms);
  });
});
