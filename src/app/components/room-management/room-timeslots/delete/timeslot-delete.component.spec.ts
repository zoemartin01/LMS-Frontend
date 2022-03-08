import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import * as moment from "moment";

import { TimeslotDeleteComponent } from "./timeslot-delete.component";

import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { TimespanId } from "../../../../types/aliases/timespan-id";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { Room } from "../../../../types/room";
import { RoomId } from "../../../../types/aliases/room-id";

class MockRoomService {
  public getTimeslot(roomId: RoomId, timeslotId: TimespanId): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      if(timeslotId === 'timeSlotIdwithStartEndEndNull'){
        observer.next({
          id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: null,
          end: null,
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
        });
        return;
      }

      const timeslot: RoomTimespan = {
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
        }
      };

      observer.next(timeslot);
    });
  }

  public deleteTimeslot(roomId: RoomId, timeslotId: TimespanId): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      if (localStorage.getItem('throwTimeSlotConflictError') === 'true') {
        observer.error({
          status: 409,
          error: {
            message: 'Has Conflict.',
          },
        });
      }

      const timeslot: RoomTimespan = {
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
      };

      observer.next(timeslot);
    });
  }

  public deleteTimeslotSeries(roomId: RoomId, seriesId: TimespanId): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      if (localStorage.getItem('throwTimeSlotConflictError') === 'true') {
        observer.error({
          status: 409,
          error: {
            message: 'Has Conflict.',
          },
        });
      }

      const timeslot: RoomTimespan = {
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
      };

      observer.next(timeslot);
    });
  }
}

class MockModalService {
  open(): { componentInstance: { room: Room | null, timeslot: RoomTimespan | null }, result: Promise<string> } {
    return {
      componentInstance: {
        room: {
          id: null,
          name: '',
          description: '',
          maxConcurrentBookings: 1,
          autoAcceptBookings: null,
        },
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

describe('TimeslotDeleteComponent method calls', () => {
  let component: TimeslotDeleteComponent;
  let fixture: ComponentFixture<TimeslotDeleteComponent>;
  let getTimeslotDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotDeleteComponent,
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
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotDeleteComponent);
    component = fixture.componentInstance;
    getTimeslotDataMethod = spyOn(component, 'getTimeslotData');
    getTimeslotDataMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get timeslot to init page', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(getTimeslotDataMethod).toHaveBeenCalled();
  }));
});

describe('TimeslotDeleteComponent', () => {
  let component: TimeslotDeleteComponent;
  let fixture: ComponentFixture<TimeslotDeleteComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotDeleteComponent,
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

    fixture = TestBed.createComponent(TimeslotDeleteComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should show error message on get timeslot error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getTimeslotData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should set attributes to correct values after ngOnInit', fakeAsync(() => {
    component.timeslot.id = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.timeslot.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    const testTimeslot: RoomTimespan = {
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
    };

    component.ngOnInit();
    tick();

    expect(component.timeslot).toEqual(testTimeslot);

    expect(component.timeslotDeleteForm.controls['type'].value).toEqual(testTimeslot.type);
    expect(component.timeslotDeleteForm.controls['room'].value).toEqual(testTimeslot.room.name);
    expect(component.timeslotDeleteForm.controls['date'].value)
      .toEqual(testTimeslot.start?.format('DD.MM.YYYY'));
    expect(component.timeslotDeleteForm.controls['startHour'].value)
      .toEqual(testTimeslot.start?.format('HH:mm'));
    expect(component.timeslotDeleteForm.controls['endHour'].value).toEqual(testTimeslot.end?.format('HH:mm'));
    expect(component.timeslotDeleteForm.controls['timeSlotRecurrence'].value).toEqual(testTimeslot.timeSlotRecurrence);
    expect(component.timeslotDeleteForm.controls['amount'].value).toEqual(testTimeslot.amount);
  }));

  it('should delete timeslot', fakeAsync(() => {
    let closeForm = spyOn(component.activeModal, 'close');

    component.timeslot.id = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.timeslot.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.deleteTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith('deleted');
  }));

  it('should delete timeslot series', fakeAsync(() => {
    let closeForm = spyOn(component.activeModal, 'close');

    component.timeslot.id = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.timeslot.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.deleteTimeslotSeries();
    tick();

    expect(closeForm).toHaveBeenCalledWith('deleted');
  }));

  it('should show error message on edit timeslot series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.timeslot.id = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.timeslot.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.deleteTimeslotSeries();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on edit timeslot error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.timeslot.id = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.timeslot.room.id = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.deleteTimeslot();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on delete timeslot conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.deleteTimeslot();
    tick();

    expect(component.appointmentConflictMessage ).toBe('Has Conflict.');
    expect(component.errorMessage).toBe('');

    localStorage.removeItem('throwTimeSlotConflictError');
  }));

  it('should show error message on delete timeslot series conflict error', fakeAsync(() => {
    localStorage.setItem('throwTimeSlotConflictError', 'true');

    component.deleteTimeslotSeries();
    tick();

    expect(component.appointmentConflictMessage ).toBe('Has Conflict.');
    expect(component.errorMessage).toBe('');

    localStorage.removeItem('throwTimeSlotConflictError');
  }));
});
