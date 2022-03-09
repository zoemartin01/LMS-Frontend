import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { RoomCreateComponent } from './room-create.component';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

class MockRoomService {
  createRoom(name: string, description: string, maxConcurrentBookings: number, autoAcceptBookings: boolean): Observable<Room> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
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
        { provide: RoomService, useClass: MockRoomService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Room', fakeAsync(() => {
    component.roomCreateForm.controls['name'].setValue("Test room");
    component.roomCreateForm.controls['description'].setValue("edited description");
    component.roomCreateForm.controls['maxConcurrentBookings'].setValue("3");
    component.roomCreateForm.controls['autoAcceptBookings'].setValue("false");

    let closeModal = spyOn(component.activeModal, 'close');

    component.createRoom();
    tick();

    expect(closeModal).toHaveBeenCalledWith('created c7231328-203e-43f5-9ac1-d374d90484ac');
  }));

  it('should handle invalid form entries on create Room', fakeAsync(() => {
    component.roomCreateForm.controls['name'].setValue("Test room");
    component.roomCreateForm.controls['description'].setValue("edited description");
    component.roomCreateForm.controls['maxConcurrentBookings'].setValue("");

    component.createRoom();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
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

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));
});
