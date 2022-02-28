import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { RoomCreateComponent } from './room-create.component';
import {RoomId} from "../../../types/aliases/room-id";
import {Observable} from "rxjs";
import {Room} from "../../../types/room";
import {RoomEditComponent} from "../edit/room-edit.component";
import {RoomService} from "../../../services/room.service";

class MockRoomService {
  createRoom(name: string, description: string, maxConcurrentBookings: number, autoAcceptBookings: boolean): Observable<Room> {
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
        description: "edited description",
        maxConcurrentBookings: 3,
        autoAcceptBookings: true
      }
      observer.next(room);
    });
  }
}

describe('RoomCreateComponent method calls', () => {
  let component: RoomCreateComponent;
  let fixture: ComponentFixture<RoomCreateComponent>;
  let createRoomMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomCreateComponent,
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

    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
    createRoomMethod = spyOn(component, 'createRoom');
    createRoomMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create room', fakeAsync(() => {
    component.createRoom();

    tick();

    expect(createRoomMethod).toHaveBeenCalled();
  }));
});

describe('RoomCreateComponent', () => {
  let component: RoomCreateComponent;
  let fixture: ComponentFixture<RoomCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomCreateComponent,
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

    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create Room', fakeAsync(() => {
    component.roomCreateForm.controls['name'].setValue("Test room");
    component.roomCreateForm.controls['description'].setValue("edited description");
    component.roomCreateForm.controls['maxConcurrentBookings'].setValue("3");
    component.roomCreateForm.controls['autoAcceptBookings'].setValue("false");

    let closeModal = spyOn(component.activeModal, 'close');

    component.createRoom();

    tick();

    expect(closeModal).toHaveBeenCalledWith('created');
  }));

  it('should handle invalid form entries on create Room', fakeAsync(() => {
    component.roomCreateForm.controls['name'].setValue("Test room");
    component.roomCreateForm.controls['description'].setValue("edited description");
    component.roomCreateForm.controls['maxConcurrentBookings'].setValue("-2");

    let consoleError = spyOn(console, 'error');

    component.createRoom();

    tick();

    expect(consoleError).toHaveBeenCalledWith('Invalid form data');
  }));

  it('should show error message on create Room error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');
    component.roomCreateForm.controls['name'].setValue("Test room");
    component.roomCreateForm.controls['description'].setValue("edited description");
    component.roomCreateForm.controls['maxConcurrentBookings'].setValue("3");
    component.roomCreateForm.controls['autoAcceptBookings'].setValue("false");

    let consoleError =  spyOn(console, 'error');

    component.createRoom();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
