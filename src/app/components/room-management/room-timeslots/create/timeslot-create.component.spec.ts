import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import * as moment from "moment";

import { TimeslotCreateComponent } from "./timeslot-create.component";

import { RoomService } from "../../../../services/room.service";

import { Room } from "../../../../types/room";
import { RoomTimespan } from "../../../../types/room-timespan";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { TimeSlotRecurrence } from "../../../../types/enums/timeslot-recurrence";

class MockRoomService {
  createTimeslot(room: Room,
                        start: moment.Moment,
                        end: moment.Moment,
                        type: RoomTimespanType): Observable<RoomTimespan> {
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

      const timeslot: RoomTimespan = {
        id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: null,
        amount: 1,
        timeSlotRecurrence: 1,
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

  createTimeslotSeries(room: Room,
                              start: moment.Moment,
                              end: moment.Moment,
                              type: RoomTimespanType,
                              timeSlotRecurrence: TimeSlotRecurrence,
                              amount: number): Observable<RoomTimespan[]> {
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

      const timeslots: RoomTimespan[] = [{
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
      }];

      observer.next(timeslots);
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
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('TimeslotCreateComponent method calls', () => {
  let component: TimeslotCreateComponent;
  let fixture: ComponentFixture<TimeslotCreateComponent>;
  let createTimeslotMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotCreateComponent,
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

    fixture = TestBed.createComponent(TimeslotCreateComponent);
    component = fixture.componentInstance;

    createTimeslotMethod = spyOn(component, 'createTimeslot');
    createTimeslotMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle change of datepicker', fakeAsync(() => {
    component.dateField.year = 2022;
    component.dateField.month = 4;
    component.dateField.day = 8;

    let setDateMethod = spyOn(component, 'setDate');

    component.handleDatepickerChange();

    expect(setDateMethod).toHaveBeenCalledWith(moment(`${component.dateField.year}-${component.dateField.month}-${component.dateField.day}`));
  }));
});

describe('TimeslotCreateComponent', () => {
  let component: TimeslotCreateComponent;
  let fixture: ComponentFixture<TimeslotCreateComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotCreateComponent,
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

    fixture = TestBed.createComponent(TimeslotCreateComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should set attributes correctly when set date is called', fakeAsync(() => {
    component.start = moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm');

    component.setDate(component.start);
    tick();

    expect(component.date).toEqual(moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'));
    expect(component.dateText).toEqual("14.02.2022");
    expect(component.dateField.day).toEqual(14);
    expect(component.dateField.month).toEqual(2);
    expect(component.dateField.year).toEqual(2022);
  }));

  it('should create timeslot', fakeAsync(() => {
    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['startHour'].setValue(7);
    component.timeslotCreateForm.controls['endHour'].setValue(17);

    component.createTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should create timeslot series', fakeAsync(() => {
    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = true;

    let closeForm = spyOn(component.closeForm, 'emit');

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['startHour'].setValue(7);
    component.timeslotCreateForm.controls['endHour'].setValue(17);
    component.recurringTimeslotCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringTimeslotCreateForm.controls['amount'].setValue(3);

    component.createTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should show error message on create timeslot series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = true;

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['startHour'].setValue(7);
    component.timeslotCreateForm.controls['endHour'].setValue(17);
    component.recurringTimeslotCreateForm.controls['timeSlotRecurrence'].setValue(TimeSlotRecurrence.monthly);
    component.recurringTimeslotCreateForm.controls['amount'].setValue(3);

    component.createTimeslot();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on create timeslot series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = false;

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['startHour'].setValue(7);
    component.timeslotCreateForm.controls['endHour'].setValue(17);

    component.createTimeslot();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should handle create timeslot with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');

    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = false;

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['endHour'].setValue(24);

    component.createTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle create timeslot series with end hour 24', fakeAsync(() => {
    let closeForm = spyOn(component.closeForm, 'emit');
    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = true;

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['endHour'].setValue(24);

    component.createTimeslot();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);
  }));

  it('should handle invalid input', fakeAsync(() => {
    component.room ={
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: false
    };
    component.isRecurring = true;

    component.ngOnInit();
    tick();

    component.timeslotCreateForm.controls['endHour'].setValue('');

    component.createTimeslot();
    tick();

    expect(consoleError).toHaveBeenCalledWith('Invalid form data');
  }));
});
