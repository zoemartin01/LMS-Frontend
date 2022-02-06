import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentService} from "../../../services/appointment.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Appointment} from "../../../types/appointment";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";
import * as moment from "moment";

@Component({
  selector: 'app-decline',
  templateUrl: './appointment-decline.component.html',
  styleUrls: ['./appointment-decline.component.scss']
})
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
    maxStart: undefined,
    amount: 1,
  };

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public appointmentService: AppointmentService, private route: ActivatedRoute, public activeModal: NgbActiveModal) {
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

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        this.appointmentDeclineForm.controls['user'].setValue(res.user.firstName + ' ' + res.user.lastName);
        this.appointmentDeclineForm.controls['room'].setValue(res.room.name);
        this.appointmentDeclineForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentDeclineForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.appointmentDeclineForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.appointmentDeclineForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.appointmentDeclineForm.controls['amount'].setValue(res.amount);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Decline appointment
   */
  public async declineAppointment(): Promise<void> {
    this.appointmentService.declineAppointmentRequest(this.appointment.id).subscribe({
      next: () => {
        this.activeModal.close('accepted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Declines appointment series
   */
  public async declineAppointmentSeries(): Promise<void> {
    this.appointmentService.declineAppointmentSeriesRequest(this.appointment.seriesId).subscribe({
      next: () => {
        this.activeModal.close('accepted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
