import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";
import { UtilityService } from "../../../services/utility.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { UserRole } from "../../../types/enums/user-role";

@Component({
  selector: 'app-appointment-delete',
  templateUrl: './appointment-delete.component.html',
  styleUrls: ['./appointment-delete.component.scss']
})

/**
 * Component for the deletion of an appointment or a series of appointments
 */
export class AppointmentDeleteComponent implements OnInit {
  public appointmentDeleteForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required),
    lastDate: new FormControl('', Validators.required),
  })
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
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public appointmentService: AppointmentService,
    public utilityService: UtilityService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.appointmentDeleteForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAppointmentData();
  }

  /**
   * Deletes appointment
   */
  public async deleteAppointment(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.deleteAppointment(this.appointment.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Deletes appointment series
   */
  public async deleteAppointmentSeries(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.deleteAppointmentSeries(this.appointment.seriesId).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Gets appointment data
   */
  public async getAppointmentData(): Promise<void> {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointmentDeleteForm.controls['user'].setValue(res.user.firstName + ' ' + res.user.lastName);
        this.appointmentDeleteForm.controls['room'].setValue(res.room.name);
        this.appointmentDeleteForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentDeleteForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.appointmentDeleteForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.appointmentDeleteForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.appointmentDeleteForm.controls['amount'].setValue(res.amount);

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        if (this.appointment.maxStart !== null) {
          this.appointment.maxStart = moment(this.appointment.maxStart);
          this.appointmentDeleteForm.controls['lastDate'].setValue(
            this.appointment.maxStart.format('DD.MM.YYYY')
          );
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
