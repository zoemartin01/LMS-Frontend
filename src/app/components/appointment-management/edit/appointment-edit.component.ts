import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { lastValueFrom } from 'rxjs';
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";
import { UtilityService } from "../../../services/utility.service";

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
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
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
    maxStart: null,
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
  public dirtyDate = false;
  public isRecurring: boolean = false;
  public seriesConflict = false;
  public force = false;
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   */
  constructor(
    public appointmentService: AppointmentService,
    public utilityService: UtilityService,
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
        this.dirtyDate = false;

        const endHour: number = +moment(this.appointment.end).format('HH');

        this.appointmentEditForm.controls['startHour'].setValue(this.appointment.start.format('HH'));
        this.appointmentEditForm.controls['endHour'].setValue(endHour === 0 ? 24 : endHour);
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
    this.dirtyDate = true;
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
    this.errorMessage = '';
    let changedData: { [key: string]: any} = {};

    if (!this.appointmentEditForm.valid) {
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }

    if (this.date !== this.appointment.start || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      const day = moment(this.date).minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      const endHour = +this.appointmentEditForm.controls['endHour'].value;
      changedData['end'] = endHour === 24
        ? moment(day).add(1, 'day').hours(0).toISOString()
        : moment(day).hours(moment(endHour, 'HH:mm').hours()).toISOString();
    }

    this.appointmentService.editAppointment(this.appointment.id, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      },
    });
  }

  /**
   * Changes data of single appointment
   */
  public async editAppointmentSeries(): Promise<void> {
    this.errorMessage = '';
    this.seriesConflict = false;
    let changedData: { [key: string]: any} =  this.utilityService.getDirtyValues(this.recurringAppointmentEditForm);

    if (!this.appointmentEditForm.valid || !this.recurringAppointmentEditForm.valid) {
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }

    if (this.force) {
      changedData['force'] = this.force;
    }

    if (this.date !== this.appointment.start || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      let day;

      if (this.dirtyDate) {
        day = moment(this.date).minutes(0).seconds(0);
      } else {
        const series = (await lastValueFrom(this.appointmentService.getAllAppointmentsForSeries(this.appointment.seriesId))).data;
        day = moment(series[0].start).minutes(0).seconds(0);
      }

      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      const endHour = +this.appointmentEditForm.controls['endHour'].value;
      changedData['end'] = endHour === 24
        ? moment(day).add(1, 'day').hours(0).toISOString()
        : moment(day).hours(moment(endHour, 'HH:mm').hours()).toISOString();
    }

    this.appointmentService.editAppointmentSeries(this.appointment.seriesId, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
      },
      error: error => {
        if (error.status === 409) {
          this.seriesConflict = true;
        } else {
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      }
    });
  }
}
