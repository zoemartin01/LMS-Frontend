import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { RoomEditComponent } from './room-edit.component';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";

class MockRoomService {
  getRoomData(roomId: RoomId): Observable<Room> {
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
        autoAcceptBookings: true,
      };

      observer.next(room);
    });
  }

  editRoomData(roomId: RoomId): Observable<Room> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });

        return;
      }

      if (localStorage.getItem('throwMaxBookingsConflictError') === 'true') {
        observer.error({
          status: 409,
          error: {
            message: 'Bookings conflict!',
          },
        });

        return;
      }

      const room: Room = {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "edited description",
        maxConcurrentBookings: 3,
        autoAcceptBookings: true,
      };

      observer.next(room);
    });
  }
}

describe('RoomEditComponent method calls', () => {
  let component: RoomEditComponent;
  let fixture: ComponentFixture<RoomEditComponent>;
  let editRoomMethod: jasmine.Spy<any>;
  let getRoomDataMethod: jasmine.Spy<any>;
  let toggleAutoAcceptBookingsMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomEditComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomEditComponent);
    component = fixture.componentInstance;

    editRoomMethod = spyOn(component, 'editRoomData');
    editRoomMethod.calls.reset();
    getRoomDataMethod = spyOn(component, 'getRoomData');
    getRoomDataMethod.calls.reset();
    toggleAutoAcceptBookingsMethod= spyOn(component, 'toggleAutoAcceptBookings');
    toggleAutoAcceptBookingsMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get room to init page', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    expect(getRoomDataMethod).toHaveBeenCalled();
  }));
});

describe('RoomEditComponent', () => {
  let component: RoomEditComponent;
  let fixture: ComponentFixture<RoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomEditComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomEditComponent);
    component = fixture.componentInstance;
  });

  it('should get room to init page and set component attributes', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    const room: Room = {
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: true,
    };

    expect(component.room).toEqual(room);
    expect(component.roomEditForm.controls['name'].value).toEqual(room.name);
    expect(component.roomEditForm.controls['description'].value).toEqual(room.description);
    expect(component.roomEditForm.controls['maxConcurrentBookings'].value).toEqual(room.maxConcurrentBookings);
    expect(component.roomEditForm.controls['autoAcceptBookings'].value).toEqual(room.autoAcceptBookings);
  }));

  it('should edit a Room', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let closeModal = spyOn(component.activeModal, 'close');

    component.getRoomData();
    tick();

    component.roomEditForm.controls['maxConcurrentBookings'].setValue(3);
    component.roomEditForm.controls['description'].setValue("edited description");

    component.editRoomData();
    tick();

    expect(closeModal).toHaveBeenCalledWith('edited');
  }));

  it('should toggle state of autoAcceptBookings', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.getRoomData();
    tick();

    component.toggleAutoAcceptBookings();
    tick();

    expect(component.roomEditForm.controls['autoAcceptBookings'].value).toEqual(false);
    expect(component.roomEditForm.controls['autoAcceptBookings'].dirty).toEqual(true);
  }));

  it('should show error message on get Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    let consoleError =  spyOn(console, 'error');

    component.getRoomData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on edit Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.roomEditForm.controls['name'].setValue("name");
    component.roomEditForm.controls['maxConcurrentBookings'].setValue(3);
    component.roomEditForm.controls['description'].setValue("edited description");

    component.editRoomData();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on edit Room max bookings conflict', fakeAsync(() => {
    localStorage.setItem('throwMaxBookingsConflictError', 'true');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.getRoomData();
    tick();

    component.roomEditForm.controls['maxConcurrentBookings'].setValue(2);
    component.roomEditForm.controls['description'].setValue("edited description");

    component.editRoomData();
    tick();

    expect(component.maxBookingsConflictMessage).toEqual('Bookings conflict!');

    localStorage.setItem('throwMaxBookingsConflictError', 'false');
  }));

  it('should handle invalid input', fakeAsync(() => {
    component.roomEditForm.controls['maxConcurrentBookings'].setValue(3);
    component.roomEditForm.controls['description'].setValue("edited description");

    component.editRoomData();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));
});
