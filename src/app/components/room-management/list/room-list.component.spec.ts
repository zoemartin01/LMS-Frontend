import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { RoomListComponent } from './room-list.component';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { PagedList } from "../../../types/paged-list";
import { PagedResponse } from "../../../types/paged-response";

class MockRoomService {
  public getRoomsData(): Observable<PagedResponse<Room>> {
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
}

class MockModalService {
  open(): { componentInstance: { room: Room | null }, result: Promise<string> } {
    return {
      componentInstance: {
        room: {
          id: null,
          name: '',
          description: '',
          maxConcurrentBookings: 1,
          autoAcceptBookings: null,
        },
      },
      result: new Promise<string>(
        resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  };
}

describe('Room list method calls', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let consoleError: jasmine.Spy<any>;
  let getAllRoomsMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomListComponent,
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

    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
    getAllRoomsMethod = spyOn(component, 'getRooms');
    getAllRoomsMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all rooms', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(getAllRoomsMethod).toHaveBeenCalled();
  }));

  it('should update rooms when room is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openRoomDeletionDialog("c2349c343c40-c918c-c319c");
    tick();

    expect(getAllRoomsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when room deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openRoomDeletionDialog("c2349c343c40-c918c-c319c");
    tick();

    expect(getAllRoomsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update rooms when room is edited', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.openRoomEditForm("c2349c343c40-c918c-c319c");
    tick();

    expect(getAllRoomsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when room edit is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openRoomEditForm("c2349c343c40-c918c-c319c");
    tick();

    expect(getAllRoomsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update rooms when room is created', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created');

    component.openRoomCreationForm();
    tick();

    expect(getAllRoomsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when room creation is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openRoomCreationForm();
    tick();

    expect(getAllRoomsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update rooms when room is viewed and dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.openRoomView("c2349c343c40-c918c-c319c");
    tick();

    expect(getAllRoomsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update rooms when room is viewed and not dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openRoomView("c2349c343c40-c918c-c319c"   );
    tick();

    expect(getAllRoomsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('RoomListComponent method calls', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomListComponent,
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

    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should get all rooms', fakeAsync(() => {
    component.rooms.pageSize = 10;

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

    expect(component.rooms).toEqual(pagedListRooms);
  }));

  it('should show error message on get rooms error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getRooms();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
