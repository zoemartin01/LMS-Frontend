import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import * as moment from "moment";

import { TimeslotEditComponent } from './timeslot-edit.component';

import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { TimespanId } from "../../../../types/aliases/timespan-id";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { Room } from "../../../../types/room";
import { RoomId } from "../../../../types/aliases/room-id";
import { TimeSlotRecurrence } from "../../../../types/enums/timeslot-recurrence";

class MockRoomService {
  getTimeslot(roomId: RoomId, timeslotId: TimespanId): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });

        return;
      }

      if (timeslotId === 'IdWithEnd0') {
        const timeslot: RoomTimespan = {
          id: "IdWithEnd0",
          start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T00:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
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
        },
      };

      observer.next(timeslot);
    });
  }

  editTimeslot(roomId: RoomId, timeslotId: TimespanId, changedData: object): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
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

  editTimeslotSeries(roomId: RoomId, seriesId: TimespanId, changedData: object): Observable<RoomTimespan> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
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

describe('TimeslotEditComponent method calls', () => {
  let component: TimeslotEditComponent;
  let fixture: ComponentFixture<TimeslotEditComponent>;
  let getTimeslotDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotEditComponent,
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

    fixture = TestBed.createComponent(TimeslotEditComponent);
    component = fixture.componentInstance;

    getTimeslotDataMethod = spyOn(component, 'getTimeslot');
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

  it('should handle change of datepicker', fakeAsync(() => {
    component.dateField.year = 2022;
    component.dateField.month = 4;
    component.dateField.day = 8;

    let setDateMethod = spyOn(component, 'setDate');

    component.handleDatepickerChange();

    expect(setDateMethod).toHaveBeenCalledWith(moment(`${component.dateField.year}-${component.dateField.month}-${component.dateField.day}`));
  }));
});

describe('TimeslotEditComponent', () => {
  let component: TimeslotEditComponent;
  let fixture: ComponentFixture<TimeslotEditComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotEditComponent,
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

    fixture = TestBed.createComponent(TimeslotEditComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should show error message on get timeslot error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getTimeslot();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should set attributes to correct values after ngOnInit', fakeAsync(() => {
    component.timeslotId = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

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
    expect(component.timeslot.start).toEqual(testTimeslot.start);
    expect(component.timeslot.end).toEqual(testTimeslot.end);
    expect(component.timeslotEditForm.controls['type'].value).toEqual(testTimeslot.type);
    expect(+component.timeslotEditForm.controls['startHour'].value).toEqual(23);
    expect(+component.timeslotEditForm.controls['endHour'].value).toEqual(22);
    expect(component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].value)
      .toEqual(testTimeslot.timeSlotRecurrence);
    expect(component.recurringTimeslotEditForm.controls['amount'].value).toEqual(testTimeslot.amount);
  }));

  it('should set attributes to correct values after ngOnInit with endhour 0', fakeAsync(() => {
    component.timeslotId = 'IdWithEnd0';
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

    const testTimeslot: RoomTimespan = {
      id: "IdWithEnd0",
      start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-14T00:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
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
    expect(component.timeslot.start).toEqual(testTimeslot.start);
    expect(component.timeslot.end).toEqual(testTimeslot.end);
    expect(component.timeslotEditForm.controls['type'].value).toEqual(testTimeslot.type);
    expect(+component.timeslotEditForm.controls['startHour'].value).toEqual(23);
    expect(+component.timeslotEditForm.controls['endHour'].value).toEqual(24);
    expect(component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].value)
      .toEqual(testTimeslot.timeSlotRecurrence);
    expect(component.recurringTimeslotEditForm.controls['amount'].value).toEqual(testTimeslot.amount);
  }));

  it('should set attributes correctly when set date is called', fakeAsync(() => {
    component.timeslot.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    component.setDate(component.timeslot.start);
    tick();

    expect(component.date).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.dateText).toEqual("14.02.2022");
    expect(component.dateField.day).toEqual(14);
    expect(component.dateField.month).toEqual(2);
    expect(component.dateField.year).toEqual(2022);
  }));

  it('should edit timeslot', fakeAsync(() => {
    component.timeslotId = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();
    component.timeslotEditForm.controls['endHour'].setValue(17);
    component.timeslotEditForm.controls['endHour'].markAsDirty();

    component.editTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should edit timeslot series', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');

    component.timeslotId = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();
    component.recurringTimeslotEditForm.controls['amount'].setValue(2);
    component.recurringTimeslotEditForm.controls['amount'].markAsDirty();

    component.editTimeslotSeries();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should show error message on edit timeslot series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.timeslotEditForm.controls['endHour'].setValue(10);
    component.timeslotEditForm.controls['type'].setValue(2);
    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();
    component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].markAsDirty();
    component.recurringTimeslotEditForm.controls['amount'].setValue(2);
    component.recurringTimeslotEditForm.controls['amount'].markAsDirty();

    component.editTimeslotSeries();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on edit timeslot error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.timeslotEditForm.controls['endHour'].setValue(10);
    component.timeslotEditForm.controls['type'].setValue(2);
    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();

    component.editTimeslot();
    tick();

    expect(component.errorMessage).toBe('Unknown Error.');

    localStorage.setItem('throwError', 'false');
  }));

  it('should throw invalid input error on edit timeslot series error', fakeAsync(() => {
    component.timeslotEditForm.controls['type'].setValue(2);
    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();
    component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringTimeslotEditForm.controls['timeSlotRecurrence'].markAsDirty();

    component.editTimeslotSeries();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));

  it('should throw invalid input error on edit timeslot error', fakeAsync(() => {
    component.timeslotEditForm.controls['type'].setValue(2);
    component.timeslotEditForm.controls['startHour'].setValue(7);
    component.timeslotEditForm.controls['startHour'].markAsDirty();

    component.editTimeslot();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));

  it('should handle edit timeslot with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');

    component.timeslotId = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.timeslotEditForm.controls['endHour'].setValue(24);
    component.timeslotEditForm.controls['endHour'].markAsDirty();

    component.editTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle edit appointment series with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');

    component.timeslotId = "8e762183-dcb3-4018-b02d-fb5c3c46a9f8";
    component.roomId = "c7231328-203e-43f5-9ac1-d374d90484ac";

    component.ngOnInit();
    tick();

    component.timeslotEditForm.controls['endHour'].setValue(24);
    component.timeslotEditForm.controls['endHour'].markAsDirty();
    component.recurringTimeslotEditForm.controls['amount'].setValue(2);
    component.recurringTimeslotEditForm.controls['amount'].markAsDirty();

    component.editTimeslotSeries();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));
});
