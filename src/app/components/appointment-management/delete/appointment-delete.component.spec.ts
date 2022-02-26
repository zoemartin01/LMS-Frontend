import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppointmentDeleteComponent } from './appointment-delete.component';
import {TimespanId} from "../../../types/aliases/timespan-id";
import {Observable} from "rxjs";
import {Appointment} from "../../../types/appointment";
import * as moment from "moment";
import {AppointmentService} from "../../../services/appointment.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SeriesId} from "../../../types/aliases/series-id";

class MockAppointmentService {
  public getAppointmentData(appointmentId: TimespanId): Observable<Appointment> {
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

      const appointment: Appointment = {

        id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
        start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 1,
        seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
        amount: 4,
        timeSlotRecurrence: 3,
        confirmationStatus: 2,
        maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        },
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        }
      }
      observer.next(appointment);
    });
  }

  deleteAppointment(appointmentId: TimespanId): Observable<void> {
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

      observer.next();
    });
  }

  deleteAppointmentSeries(seriesId: SeriesId): Observable<void> {
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

      observer.next();
    });
  }
}

describe('AppointmentDeleteComponent method calls', () => {
  let component: AppointmentDeleteComponent;
  let fixture: ComponentFixture<AppointmentDeleteComponent>;
  let deleteAppointmentMethod: jasmine.Spy<any>;
  let deleteAppointmentSeriesMethod: jasmine.Spy<any>;
  let getAppointmentDataMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: AppointmentService, useClass: MockAppointmentService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDeleteComponent);
    component = fixture.componentInstance;
    deleteAppointmentMethod = spyOn(component, 'deleteAppointment');
    deleteAppointmentMethod.calls.reset();
    deleteAppointmentSeriesMethod = spyOn(component, 'deleteAppointmentSeries');
    deleteAppointmentSeriesMethod.calls.reset();
    getAppointmentDataMethod = spyOn(component, 'getAppointmentData');
    getAppointmentDataMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get appointment to init page',fakeAsync(() =>{
    component.ngOnInit();
    tick();
    expect(getAppointmentDataMethod).toHaveBeenCalled();
  }));

  it('should delete appointment', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.getAppointmentData();
    tick();
    component.deleteAppointment()
    tick();
    expect(deleteAppointmentMethod).toHaveBeenCalled();
  }));

  it('should delete appointment series', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.getAppointmentData();
    tick();
    component.deleteAppointmentSeries()
    tick();
    expect(deleteAppointmentSeriesMethod).toHaveBeenCalled();
  }));
});
describe('AppointmentDeleteComponent', () => {
  let component: AppointmentDeleteComponent;
  let fixture: ComponentFixture<AppointmentDeleteComponent>;
  let consoleError: jasmine.Spy<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentDeleteComponent,
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
        {provide: AppointmentService, useClass: MockAppointmentService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDeleteComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should delete an appointment', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.getAppointmentData();
    tick();
    let closeModal = spyOn(component.activeModal, 'close');
    component.deleteAppointment()
    tick();
    expect(closeModal).toHaveBeenCalledWith('deleted');
  }));

  it('should delete an appointment series', fakeAsync(() => {
    component.appointment.id = "c3a70a44-374c-46a9-be05-a3f6ef4e39a5";
    component.getAppointmentData();
    tick();
    let closeModal = spyOn(component.activeModal, 'close');
    component.deleteAppointmentSeries()
    tick();
    expect(closeModal).toHaveBeenCalledWith('deleted');
  }));

  it('should show error message on get appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getAppointmentData();
    tick();
    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on delete appointment error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.deleteAppointment();
    tick();
    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on delete appointment series error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.deleteAppointmentSeries();
    tick();
    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
