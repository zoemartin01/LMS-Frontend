import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { BehaviorSubject, Observable } from "rxjs";
import * as moment from "moment";

import { TimeslotsListComponent } from './timeslots-list.component';

import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { Room } from "../../../../types/room";
import { RoomId } from "../../../../types/aliases/room-id";
import { PagedList } from "../../../../types/paged-list";
import { PagedResponse } from "../../../../types/paged-response";

class MockRoomService {
  getRoomsData(): Observable<PagedResponse<Room>> {
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

      const rooms: PagedResponse<Room> = {
        total: 3,
        data: [
          {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          {
            id: "c2349c343c40-c918c-c319c",
            name: "Test room 2",
            description: "room to test 3",
            maxConcurrentBookings: 2,
            autoAcceptBookings: true
          },
          {
            id: "c7203923n-43-f-23--84ac",
            name: "Test room 3",
            description: "room to test 3",
            maxConcurrentBookings: 3,
            autoAcceptBookings: true
          },
        ]
      };

      observer.next(rooms);
    });
  }

  getAvailableTimeslots(roomId: RoomId): Observable<PagedResponse<RoomTimespan>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            },
          },
        });
      }

      let pagedListTimeslots = new PagedList<RoomTimespan>();
      pagedListTimeslots.pageSize = 10;
      pagedListTimeslots.total = 3;
      pagedListTimeslots.data = [
        {
          id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
          start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
      ];
      observer.next(pagedListTimeslots);
    });
  }

  getUnavailableTimeslots(roomId: RoomId): Observable<PagedResponse<RoomTimespan>> {
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

      let pagedListTimeslots = new PagedList<RoomTimespan>();
      pagedListTimeslots.pageSize = 10;
      pagedListTimeslots.total = 3;
      pagedListTimeslots.data = [
        {
          id: "28e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
        {
          id: "2377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
        {
          id: "2cfa078ce-402e-4453-b3cf-a2faf003c09a",
          start: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-18T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
      ];

      observer.next(pagedListTimeslots);
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
          timeSlotRecurrence: 1,
          seriesId: null,
          maxStart: null,
          amount: 1,
        },
      },
      result: new Promise<string>(
        resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  };
}

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

describe('Timeslot list method calls', () => {
  let component: TimeslotsListComponent;
  let fixture: ComponentFixture<TimeslotsListComponent>;
  let consoleError: jasmine.Spy<any>;
  let getAllRoomsMethod: jasmine.Spy<any>;
  let getTimeslotMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsListComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
    getAllRoomsMethod = spyOn(component, 'getRooms');
    getAllRoomsMethod.calls.reset();
    getTimeslotMethod = spyOn(component, 'getTimeslots');
    getTimeslotMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rooms when timeslot is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotDeletionDialog("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when timeslot deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotDeletionDialog("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update room when timeslot is edited', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotEditForm("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update room when timeslot edit is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotEditForm("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update room when timeslot is created', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotCreationForm();
    tick();

    expect(getTimeslotMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update room when timeslot creation is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotCreationForm();
    tick();

    expect(getTimeslotMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update room when timeslot is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotView("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when room is viewed and not dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openTimeslotView("exampleTimeslotID");
    tick();

    expect(getTimeslotMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('Timeslot list method calls', () => {
  let component: TimeslotsListComponent;
  let fixture: ComponentFixture<TimeslotsListComponent>;
  let consoleError: jasmine.Spy<any>;
  let mockActivatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsListComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should get all available and unavailable timeslots', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let getAvailableTimeSlotsMethod = spyOn(component, 'getAvailableTimeslots');
    let getUnavailableTimeSlotsMethod = spyOn(component, 'getUnavailableTimeslots');

    component.getTimeslots();
    tick();

    expect(getAvailableTimeSlotsMethod).toHaveBeenCalled();
    expect(getUnavailableTimeSlotsMethod).toHaveBeenCalled();
  }));

  it('should get all rooms and timeslots for specific room', fakeAsync(() => {
    mockActivatedRoute.testParams = {
      id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
      date: '2022-02-26',
    };

    let getRoomTimeSlotsMethod = spyOn(component, 'getTimeslots');

    component.ngOnInit();
    tick();

    expect(getRoomTimeSlotsMethod).toHaveBeenCalled();
  }));

  it('should change current room and get timeslots', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let getRoomTimeSlotsMethod = spyOn(component, 'getTimeslots');

    component.changeRoom("c2349c343c40-c918c-c319c");
    tick();

    expect(component.room.id).toEqual("c2349c343c40-c918c-c319c");
    expect(getRoomTimeSlotsMethod).toHaveBeenCalled();
  }));


   it('should get all rooms', fakeAsync(() => {
     component.availableTimeslots.pageSize = 10;
     component.unavailableTimeslots.pageSize = 10;

     component.getRooms();
     tick();

     let pagedListRooms = new PagedList<Room>();
     pagedListRooms.pageSize = 10;
     pagedListRooms.total = 3;
     pagedListRooms.data = [
       {
         id: "c7231328-203e-43f5-9ac1-d374d90484ac",
         name: "Test room",
         description: "room to test",
         maxConcurrentBookings: 1,
         autoAcceptBookings: true
       },
       {
         id: "c2349c343c40-c918c-c319c",
         name: "Test room 2",
         description: "room to test 3",
         maxConcurrentBookings: 2,
         autoAcceptBookings: true
       },
       {
         id: "c7203923n-43-f-23--84ac",
         name: "Test room 3",
         description: "room to test 3",
         maxConcurrentBookings: 3,
         autoAcceptBookings: true
       },
     ];

     expect(component.rooms).toEqual(pagedListRooms.data);
   }));

  it('should show error message on get rooms error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getRooms();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should get all available timeslots', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.getAvailableTimeslots();
    tick();

    let pagedListTimeslots = new PagedList<RoomTimespan>();
    pagedListTimeslots.pageSize = 10;
    pagedListTimeslots.total = 3;
    pagedListTimeslots.data = [
      {
        id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
      {
        id: "377ec178-5fd7-41e6-b663-664dacf5c546",
        start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
      {
        id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
        start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
    ];

    expect(component.availableTimeslots).toEqual(pagedListTimeslots);
  }));

  it('should get all unavailable timeslots', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.getUnavailableTimeslots();
    tick();

    let pagedListTimeslots = new PagedList<RoomTimespan>();
    pagedListTimeslots.pageSize = 10;
    pagedListTimeslots.total = 3;
    pagedListTimeslots.data = [
      {
        id: "28e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
      {
        id: "2377ec178-5fd7-41e6-b663-664dacf5c546",
        start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
      {
        id: "2cfa078ce-402e-4453-b3cf-a2faf003c09a",
        start: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-18T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false
        }
      },
    ];

    expect(component.unavailableTimeslots).toEqual(pagedListTimeslots);
  }));

  it('should show get all available timeslots error', fakeAsync(() => {
      localStorage.setItem('throwError', 'true');

      component.getAvailableTimeslots();
      tick();

      expect(consoleError).toHaveBeenCalled();

      localStorage.setItem('throwError', 'false');
  }));

  it('should show get all unavailable timeslots error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getUnavailableTimeslots();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
