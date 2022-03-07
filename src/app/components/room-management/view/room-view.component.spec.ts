import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { RoomViewComponent } from './room-view.component';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";

class MockRoomService {
  public getRoomData(roomId: RoomId): Observable<Room> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
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
        }
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('RoomViewComponent method calls', () => {
  let component: RoomViewComponent;
  let fixture: ComponentFixture<RoomViewComponent>;
  let getRoomDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RoomService, useClass: MockRoomService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomViewComponent);
    component = fixture.componentInstance;
    getRoomDataMethod = spyOn(component, 'getRoomData');
    getRoomDataMethod.calls.reset();
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

  it('should close when appointment is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let closeForm = spyOn(component.activeModal, 'close');

    component.openRoomDeletionDialog();
    tick();

    expect(closeForm).toHaveBeenCalledWith('dirty');

    localStorage.removeItem('returnVal');
  }));

  it('should update appointment when appointment is not deleted but dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openRoomDeletionDialog();
    tick();

    expect(getRoomDataMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update room when room deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openRoomDeletionDialog();
    tick();

    expect(getRoomDataMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update appointment when appointment is edited', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openRoomEditForm();
    tick();

    expect(getRoomDataMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update room when room edit is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.openRoomEditForm();
    tick();

    expect(getRoomDataMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('RoomViewComponent', () => {
  let component: RoomViewComponent;
  let fixture: ComponentFixture<RoomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomViewComponent,
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

    fixture = TestBed.createComponent(RoomViewComponent);
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
      autoAcceptBookings: true
    };
    expect(component.room).toEqual(room);
    expect(component.roomViewForm.controls['name'].value).toEqual(room.name);
    expect(component.roomViewForm.controls['description'].value).toEqual(room.description);
    expect(component.roomViewForm.controls['maxConcurrentBookings'].value).toEqual(room.maxConcurrentBookings);
    expect(component.roomViewForm.controls['autoAcceptBookings'].value).toEqual(room.autoAcceptBookings);
  }));

  it('should show error message on get Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let consoleError = spyOn(console, 'error');

    component.getRoomData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should open timeslot page', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let activeModal = spyOn(component.activeModal, 'close');
    let router = spyOn(component.router, 'navigateByUrl');

    component.getRoomData();
    tick();

    component.openTimeslotPage();
    tick();

    expect(activeModal).toHaveBeenCalledWith('aborted');
    expect(router).toHaveBeenCalledWith('/room/c7231328-203e-43f5-9ac1-d374d90484ac/timeslots/calendar');
  }));

  it('should open timeslot page and close activeModal with dirty', fakeAsync(() => {
    component.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";
    component.dirty = true;

    let activeModal = spyOn(component.activeModal, 'close');
    let router = spyOn(component.router, 'navigateByUrl');

    component.getRoomData();
    tick();

    component.openTimeslotPage();
    tick();

    expect(activeModal).toHaveBeenCalledWith('dirty');
    expect(router).toHaveBeenCalledWith('/room/c7231328-203e-43f5-9ac1-d374d90484ac/timeslots/calendar');
  }));
});
