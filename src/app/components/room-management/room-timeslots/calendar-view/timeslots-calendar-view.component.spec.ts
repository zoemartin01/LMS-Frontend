import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Observable } from "rxjs";
import * as moment from "moment";

import { TimeslotsCalendarViewComponent } from './timeslots-calendar-view.component';

import { RoomService } from "../../../../services/room.service";

import { Room } from "../../../../types/room";
import { RoomId } from "../../../../types/aliases/room-id";
import { RoomTimespan } from "../../../../types/room-timespan";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { PagedResponse } from "../../../../types/paged-response";

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
            message: 'Unknown error.',
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

  getAvailabilityCalendar(roomId: RoomId, date: number | null = null): Observable<(string|null)[][]> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown error.',
          }
        });
      }

      const calendar: (string|null)[][] = [
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          null,
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          null,
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "unavailable c1db4cc9-b48f-4d2a-93f3-8caeb10cb9a7",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, null, null, null, null]
      ];

      observer.next(calendar);
    });
  }

  getRoomData(roomId: string): Observable<Room> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown error.',
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
  open(): { componentInstance: { timeslot: RoomTimespan | null }, result: Promise<string> } {
    return {
      componentInstance: {
        timeslot: {
          id: null,
          room: {
            id: null,
            name: '',
            description: '',
            maxConcurrentBookings: 1,
            autoAcceptBookings: null,
          },
          start: null,
          end: null,
          type: RoomTimespanType.unknown,
          seriesId: null,
          timeSlotRecurrence: 1,
          maxStart: null,
          amount: 1,
        },
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('TimeslotsCalendarViewComponent', () => {
  let component: TimeslotsCalendarViewComponent;
  let fixture: ComponentFixture<TimeslotsCalendarViewComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsCalendarViewComponent,
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

    fixture = TestBed.createComponent(TimeslotsCalendarViewComponent);
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
    expect(updateCalendarMethod).toHaveBeenCalled();
  }));

  it('should do nothing when trying to change room id to current', fakeAsync(() => {
    component.room.id = '59f1589d-197c-4f53-bfc1-4c57aae14c42';
    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.changeRoom('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    tick();

    expect(component.room.id).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
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

  it('should parse object as string', () => {
    expect(typeof component.parseString("kldjgkjlrkjlfdgkjldfgkjl")).toEqual("string");
  });

  it('should open timeslot creation form', () => {
    component.week = moment("2022-02-07").hours(0).minutes(0).seconds(0).milliseconds(0);

    component.action = '';
    component.timeslotCreationStart = null;

    component.openTimeslotCreationForm(3,5);

    expect(component.action).toBe('create');
    expect(component.timeslotCreationStart).not.toBeNull();
  });

  it('should try to open timeslot creation form when sidebar is already open', () => {
    component.action = 'edit';
    component.currentTimeslotId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openTimeslotCreationForm(3,5);

    expect(component.action).toBe('edit');
    expect(component.currentTimeslotId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should open timeslot view', () => {
    component.action = '';
    component.currentTimeslotId = '';

    component.openTimeslotView('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('view');
    expect(component.currentTimeslotId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  it('should try to open timeslot view when sidebar is already open', () => {
    component.action = 'edit';
    component.currentTimeslotId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openTimeslotView('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentTimeslotId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should open timeslot edit form', () => {
    component.action = '';
    component.currentTimeslotId = '';

    component.openTimeslotEditForm('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentTimeslotId).toBe('410cda0c-1027-4681-b578-61e3822534bc');
  });

  it('should try to open timeslot edit form when sidebar is already open', () => {
    component.action = 'edit';
    component.currentTimeslotId = '7d083749-e35a-4de5-a4f2-889a6cf9ca5a';

    component.openTimeslotEditForm('410cda0c-1027-4681-b578-61e3822534bc');

    expect(component.action).toBe('edit');
    expect(component.currentTimeslotId).toBe('7d083749-e35a-4de5-a4f2-889a6cf9ca5a');
  });

  it('should close sidebar and update calendar', () => {
    component.action = 'edit';
    component.currentTimeslotId = 'bla';
    component.timeslotCreationStart = moment("2022-01-28T09:00:00.000Z");

    expect(component.action).toBe('edit');
    expect(component.currentTimeslotId).toBe('bla');
    expect(component.timeslotCreationStart.toISOString()).toBe(moment("2022-01-28T09:00:00.000Z").toISOString());

    component.closeSidebar(true);

    expect(component.action).toBe('');
    expect(component.currentTimeslotId).toBe('');
    expect(component.timeslotCreationStart).toBeNull();
  });

  it('should open timeslot deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const updateCalendarMethod = spyOn(component, 'updateCalendar');

    component.openTimeslotDeletionDialog("c3a70a44-374c-46a9-be05-a3f6ef4e39a5");

    tick();

    expect(updateCalendarMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('TimeslotsCalendarViewComponent - http methods', () => {
  let component: TimeslotsCalendarViewComponent;
  let fixture: ComponentFixture<TimeslotsCalendarViewComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsCalendarViewComponent,
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

    fixture = TestBed.createComponent(TimeslotsCalendarViewComponent);
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

      const calendar: (string|null)[][] = [
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          null,
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          null,
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "unavailable c1db4cc9-b48f-4d2a-93f3-8caeb10cb9a7",
          "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
          "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "available 2957a506-b4d7-4184-86fa-25383e56edb6",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [
          null,
          null,
          null,
          "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
          "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
          null,
          null
        ],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
        [null, null, null, null, null, null, null]
      ];

      expect(component.calendar).toEqual(calendar);

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
