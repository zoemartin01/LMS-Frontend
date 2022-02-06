import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import {AppointmentService} from "../../../services/appointment.service";

import {Appointment} from "../../../types/appointment";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {UserRole} from "../../../types/enums/user-role";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 *
 */
export class AppointmentEditComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() close = new EventEmitter<boolean>();
  public appointmentEditForm: FormGroup = new FormGroup({
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
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
    timeSlotRecurrence: TimeSlotRecurrence.unknown,
    maxStart: undefined,
    amount: 1,
  };

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public appointmentService: AppointmentService,
    public activeModal: NgbActiveModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.appointment.id = this.appointmentId;
    this.getAppointmentData();
    console.log(this.appointment);
  }

  /**
   * Gets all data for one appointment
   */
  public getAppointmentData(): void {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        this.appointmentEditForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentEditForm.controls['startHour'].setValue(res.start?.format('HH:00'));
        this.appointmentEditForm.controls['endHour'].setValue(res.end?.format('HH:00'));
        this.appointmentEditForm.controls['confirmationStatus'].setValue(res.confirmationStatus);
        this.appointmentEditForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.appointmentEditForm.controls['amount'].setValue(res.amount);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Changes data of single appointment
   */
  public async editAppointment(): Promise<void> {
    let changedData: { [key: string]: any} = {};

    if (this.appointmentEditForm.controls['date'].dirty || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      const appointmentStart = moment(this.appointment.start);

      const day = moment(appointmentStart)
        .add((+this.appointmentEditForm.controls['date'].value + 6) % 7 - (appointmentStart.day() + 6) % 7,
          'days').minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).format();
      changedData['end'] = day.hours(moment(this.appointmentEditForm.controls['endHour'].value, 'HH:mm')
        .hours()).format();
    }

    this.appointmentService.editAppointment(this.appointment.id, changedData).subscribe({
      next: () => {
        this.close.emit(true);
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
    let changedData: { [key: string]: any} = {};

    if (this.appointmentEditForm.controls['date'].dirty || this.appointmentEditForm.controls['startHour'].dirty
      || this.appointmentEditForm.controls['endHour'].dirty) {
      const day = moment(this.appointmentEditForm.controls['date'].value).minutes(0).seconds(0);
      changedData['start'] = day.hours(moment(this.appointmentEditForm.controls['startHour'].value).hours())
        .toISOString();
      changedData['end'] = day.hours(moment(this.appointmentEditForm.controls['endHour'].value).hours())
        .toISOString();
    }

    this.appointmentService.editAppointmentSeries(this.appointment.id, changedData).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.close.emit(true);
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
