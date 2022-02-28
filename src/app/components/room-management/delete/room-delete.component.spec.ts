import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {RoomDeleteComponent} from './room-delete.component';
import {Observable} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomId} from "../../../types/aliases/room-id";
import {Room} from "../../../types/room";
import {RoomService} from "../../../services/room.service";

class MockRoomService {
  public getRoomData(roomId: RoomId): Observable<Room> {
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

      const room: Room = {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      }
      observer.next(room);
    });
  }

  deleteRoom(roomId: RoomId): Observable<Room> {
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
      const room: Room = {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      }
      observer.next(room);
    });
  }
}

describe('RoomDeleteComponent method calls', () => {
  let component: RoomDeleteComponent;
  let fixture: ComponentFixture<RoomDeleteComponent>;
  let deleteRoomMethod: jasmine.Spy<any>;
  let getRoomDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: RoomService, useClass: MockRoomService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponent);
    component = fixture.componentInstance;
    deleteRoomMethod = spyOn(component, 'deleteRoom');
    deleteRoomMethod.calls.reset();
    getRoomDataMethod = spyOn(component, 'getRoomData');
    getRoomDataMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get room to init page', fakeAsync(() => {
    component.ngOnInit();

    tick();

    expect(getRoomDataMethod).toHaveBeenCalled();
  }));
});

describe('RoomDeleteComponent', () => {
  let component: RoomDeleteComponent;
  let fixture: ComponentFixture<RoomDeleteComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomDeleteComponent,
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
        {provide: RoomService, useClass: MockRoomService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should get room to init page and set component attributes', fakeAsync(() => {
    component.ngOnInit();

    tick();
    const room: Room = {
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: true
    }
    expect(component.room).toEqual(room);
    expect(component.roomDeleteForm.controls['name'].value).toEqual(room.name);
    expect(component.roomDeleteForm.controls['description'].value).toEqual(room.description);
    expect(component.roomDeleteForm.controls['maxConcurrentBookings'].value).toEqual(room.maxConcurrentBookings);
    expect(component.roomDeleteForm.controls['autoAcceptBookings'].value).toEqual(room.autoAcceptBookings);

  }));

  it('should delete an Room', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.getRoomData();
    tick();

    let closeModal = spyOn(component.activeModal, 'close');

    component.deleteRoom()
    tick();

    expect(closeModal).toHaveBeenCalledWith('deleted');
  }));

  it('should show error message on get Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getRoomData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on delete Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.deleteRoom();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
