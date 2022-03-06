import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";
import { UtilityService } from "../../../services/utility.service";

import { Appointment } from "../../../types/appointment";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { TimeSlotRecurrence } from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-decline',
  templateUrl: './appointment-decline.component.html',
  styleUrls: ['./appointment-decline.component.scss']
})

/**
 * Component for the appointment decline page
 */
export class AppointmentDeclineComponent implements OnInit {
  public appointmentDeclineForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required),
    lastDate: new FormControl('', Validators.required),
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
    confirmationStatus: ConfirmationStatus.unknown,
    timeSlotRecurrence: TimeSlotRecurrence.unknown,
    maxStart: null,
    amount: 1,
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
    this.appointmentDeclineForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAppointmentData();
  }

  /**
   * Gets appointment data
   */
  public async getAppointmentData(): Promise<void> {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointmentDeclineForm.controls['user'].setValue(res.user.firstName + ' ' + res.user.lastName);
        this.appointmentDeclineForm.controls['room'].setValue(res.room.name);
        this.appointmentDeclineForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentDeclineForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.appointmentDeclineForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.appointmentDeclineForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.appointmentDeclineForm.controls['amount'].setValue(res.amount);

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        if (this.appointment.maxStart !== null) {
          this.appointment.maxStart = moment(this.appointment.maxStart);
          this.appointmentDeclineForm.controls['lastDate'].setValue(this.appointment.maxStart.format('DD.MM.YYYY'));
        }
      },
      error: error => {
        console.error('There was an error!', error);
      },
    })
  }

  /**
   * Decline appointment
   */
  public async declineAppointment(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.declineAppointmentRequest(this.appointment.id).subscribe({
      next: () => {
        this.activeModal.close('declined');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Declines appointment series
   */
  public async declineAppointmentSeries(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.declineAppointmentSeriesRequest(this.appointment.seriesId).subscribe({
      next: () => {
        this.activeModal.close('declined');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
