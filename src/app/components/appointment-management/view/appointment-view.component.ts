import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { UserRole } from "../../../types/enums/user-role";
import {AuthService} from "../../../services/auth.service";

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
  public appointment: Appointment = {
    id: null,
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      userRole: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
    },
    room: {
      id: null,
      name: '',
      description: '',
      maxConcurrentBookings: 1,
      automaticRequestAcceptance: null,
      availableTimeslots: [],
      unavailableTimeslots: [],
    },
    start: null,
    end: null,
    type: RoomTimespanType.appointment,
    seriesId: null,
    confirmationStatus: ConfirmationStatus.unknown,
  };

    /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public appointmentService: AppointmentService, public authService: AuthService, private route: ActivatedRoute) {
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
  }

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {
  }
}
