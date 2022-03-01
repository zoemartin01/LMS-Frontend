import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {TimeslotViewComponent} from './timeslot-view.component';
import {TimespanId} from "../../../../types/aliases/timespan-id";
import {Observable} from "rxjs";
import * as moment from "moment";
import {RoomTimespanType} from "../../../../types/enums/timespan-type";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomTimespan} from "../../../../types/room-timespan";
import {RoomService} from "../../../../services/room.service";
import {Room} from "../../../../types/room";

class MockRoomService {
  public getTimeslot(timeslotId: TimespanId): Observable<RoomTimespan> {
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
          autoAcceptBookings: false
        }
      }
      observer.next(timeslot);
    });
  }
}

class MockModalService {
  open(): { componentInstance: { room: Room| null, timeslot: RoomTimespan | null }, result: Promise<string> } {
    return {
      componentInstance: {
        room:{
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
        }
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('TimeslotViewComponent method calls', () => {
  let component: TimeslotViewComponent;
  let fixture: ComponentFixture<TimeslotViewComponent>;
  let getTimeslotDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotViewComponent,
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
        {provide: RoomService, useClass: RoomService},
        {provide: NgbModal, useClass: MockModalService},

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotViewComponent);
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

  it('should close when timeslot is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');
    let closeForm = spyOn(component.closeForm, 'emit');
    component.openTimeslotDeletionDialog();
    tick();

    expect(closeForm).toHaveBeenCalledWith(true);

    localStorage.removeItem('returnVal');
  }));

  it('should update timeslot when timeslot is not deleted but dirty', fakeAsync(() => {
    localStorage.setItem('returnVal', 'updated');
    component.openTimeslotDeletionDialog();
    tick();

    expect(getTimeslotDataMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update timeslot when timeslot deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openTimeslotDeletionDialog();

    tick();

    expect(getTimeslotDataMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('TimeslotViewComponent', () => {
  let component: TimeslotViewComponent;
  let fixture: ComponentFixture<TimeslotViewComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotViewComponent,
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

    fixture = TestBed.createComponent(TimeslotViewComponent);
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
        autoAcceptBookings: false
      }
    };

    component.ngOnInit();
    tick();

    expect(component.timeslot).toEqual(testTimeslot);
    expect(component.timeslot.start).toEqual(testTimeslot.start);
    expect(component.timeslot.end).toEqual(testTimeslot.end);
    expect(component.timeslotViewForm.controls['type'].value).toEqual(testTimeslot.type);
    expect(component.timeslotViewForm.controls['room'].value).toEqual(testTimeslot.room.name);
    expect(component.timeslotViewForm.controls['date'].value).toEqual(testTimeslot.start?.format('DD.MM.YYYY'));
    expect(component.timeslotViewForm.controls['startHour'].value).toEqual(testTimeslot.start?.format('HH:mm'));
    expect(component.timeslotViewForm.controls['endHour'].value).toEqual(testTimeslot.end?.format('HH:mm'));
    expect(component.timeslotViewForm.controls['timeSlotRecurrence'].value).toEqual(testTimeslot.timeSlotRecurrence);
    expect(component.timeslotViewForm.controls['amount'].value).toEqual(testTimeslot.amount);
  }));
});
