import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {AppointmentService} from "../../../services/appointment.service";
import {AuthService} from "../../../services/auth.service";

import {Appointment} from "../../../types/appointment";
import {TimespanId} from "../../../types/aliases/timespan-id";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {UserRole} from "../../../types/enums/user-role";
import {TimeslotRecurrence} from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})

/**
 * Component for the appointment view page
 *
 *
 */
export class AppointmentViewComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() updateCalendar = new EventEmitter<void>();
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
    timeSlotRecurrence: TimeslotRecurrence.unknown
  };

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(
    public appointmentService: AppointmentService,
    public authService: AuthService,
    private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointment.id = params['id'];
      this.getAppointmentData();
    });
  }

  /**
   * Gets all data of appointment
   */
  public async getAppointmentData(): Promise<void> {
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {

    this.updateCalendar.emit(); //triggers calendar update in parent component
  }

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {

    this.updateCalendar.emit(); //triggers calendar update in parent component
  }
}
