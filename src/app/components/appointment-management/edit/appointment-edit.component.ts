import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { UserRole } from "../../../types/enums/user-role";
import { TimeSlotRecurrence } from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 */
export class AppointmentEditComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() closeForm = new EventEmitter<boolean>();
  public appointmentEditForm: FormGroup = new FormGroup({
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
  });
  public recurringAppointmentEditForm: FormGroup = new FormGroup({
    timeSlotRecurrence: new FormControl(''),
    amount: new FormControl(''),
  });
  public appointment: Appointment = {
    id: null,
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    },
    room: {
      id: null,
      name: '',
      description: '',
      maxConcurrentBookings: 1,
      autoAcceptBookings: null,
    },
    start: null,
    end: null,
    type: RoomTimespanType.appointment,
    seriesId: null,
    timeSlotRecurrence: 1,
    maxStart: undefined,
    amount: 1,
    confirmationStatus: ConfirmationStatus.unknown,
  };
  public date: moment.Moment = moment();
  public dateText: string = '';
  public dateField: NgbDateStruct = new class implements NgbDateStruct {
    day = 1;
    month = 1;
    year = 1990;
  };
  public isRecurring: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   */
  constructor(
    public appointmentService: AppointmentService,
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.appointment.id = this.appointmentId;
    this.getAppointmentData();
  }

  /**
   * Gets all data for one appointment
   */
  public getAppointmentData(): void {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end)

        this.setDate(this.appointment.start);

        this.appointmentEditForm.controls['startHour'].setValue(this.appointment.start.format('HH'));
        this.appointmentEditForm.controls['endHour'].setValue(this.appointment.end.format('HH'));
        this.recurringAppointmentEditForm.controls['timeSlotRecurrence'].setValue(this.appointment.timeSlotRecurrence);
        this.recurringAppointmentEditForm.controls['amount'].setValue(this.appointment.amount);

        this.isRecurring = this.appointment.timeSlotRecurrence !== TimeSlotRecurrence.single;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Sets current date
   *
   * @param {moment.Moment} date date
   */
  public setDate(date: moment.Moment): void {
    this.date = date;

    this.dateText = this.date.format("DD.MM.YYYY");

    this.dateField.day = +this.date.format("D");
    this.dateField.month = +this.date.format("M");
    this.dateField.year = +this.date.format("YYYY");
  }

  /**
   * Handles change of datepicker
   */
  public handleDatepickerChange(): void {
    this.setDate(moment(`${this.dateField.year}-${this.dateField.month}-${this.dateField.day}`));
  }

  /**
   * Changes data of single appointment
   */
  public async editAppointment(): Promise<void> {
    let changedData: { [key: string]: any} = {};

    if (this.date !== this.appointment.start || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      const day = moment(this.date).minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      changedData['end'] = day.hours(moment(this.appointmentEditForm.controls['endHour'].value, 'HH:mm')
        .hours()).toISOString();
    }

    this.appointmentService.editAppointment(this.appointment.id, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Changes data of single appointment
   */
  public async editAppointmentSeries(): Promise<void> {
    let changedData: { [key: string]: any} =  this.getDirtyValues(this.recurringAppointmentEditForm);

    if (this.date !== this.appointment.start || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      const day = moment(this.date).minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      changedData['end'] = day.hours(moment(this.appointmentEditForm.controls['endHour'].value, 'HH:mm')
        .hours()).toISOString();
    }

    this.appointmentService.editAppointmentSeries(this.appointment.seriesId, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all values of a form that are marked with a dirty bit
   *
   * @param {FormGroup} form form
   */
  public getDirtyValues(form: FormGroup) {
    let dirtyValues: { [key: string]: any} = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if ((<FormGroup>currentControl).controls)
            dirtyValues[key] = this.getDirtyValues(<FormGroup>currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
}
