import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";
import { UtilityService } from "../../../services/utility.service";

import { Appointment } from "../../../types/appointment";
import { UserRole } from "../../../types/enums/user-role";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { TimeSlotRecurrence } from "../../../types/enums/timeslot-recurrence";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-accept',
  templateUrl: './appointment-accept.component.html',
  styleUrls: ['./appointment-accept.component.scss']
})

/**
 * Component for the appointment accept function, to accept requested appointments
 */
export class AppointmentAcceptComponent implements OnInit {
  public appointmentAcceptForm: FormGroup = new FormGroup({
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
    public activeModal: NgbActiveModal) {
    this.appointmentAcceptForm.disable();
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

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        this.appointmentAcceptForm.controls['user'].setValue(this.appointment.user.firstName + ' ' + this.appointment.user.lastName);
        this.appointmentAcceptForm.controls['room'].setValue(this.appointment.room.name);
        this.appointmentAcceptForm.controls['date'].setValue(this.appointment.start.format('DD.MM.YYYY'));
        this.appointmentAcceptForm.controls['startHour'].setValue(this.appointment.start.format('HH:mm'));
        this.appointmentAcceptForm.controls['endHour'].setValue(this.appointment.end.format('HH:mm'));
        this.appointmentAcceptForm.controls['timeSlotRecurrence'].setValue(this.appointment.timeSlotRecurrence);
        this.appointmentAcceptForm.controls['amount'].setValue(this.appointment.amount);

        if (this.appointment.maxStart !== null) {
          this.appointment.maxStart = moment(this.appointment.maxStart);
          this.appointmentAcceptForm.controls['lastDate'].setValue(this.appointment.maxStart.format('DD.MM.YYYY'));
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Accepts appointment
   */
  public async acceptAppointment(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.acceptAppointmentRequest(this.appointment.id).subscribe({
      next: () => {
        this.activeModal.close('accepted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Accepts appointment series
   */
  public async acceptAppointmentSeries(): Promise<void> {
    this.errorMessage = '';

    this.appointmentService.acceptAppointmentSeriesRequest(this.appointment.seriesId).subscribe({
      next: () => {
        this.activeModal.close('accepted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
