import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { AppointmentId } from "../../../types/aliases/appointment-id";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { RoomTimespanType } from "../../../types/enums/timespan-type";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {
  public appointment: Appointment = {
    id: null,
    userId: null,
    roomTimespan: {
      roomId: null,
      start: null,
      end: null,
      type: RoomTimespanType.appointment,
    },
    seriesId: null,
    confirmationStatus: ConfirmationStatus.unknown,
  };

  constructor(public appointmentService: AppointmentService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointment.id = +params['id'];
      this.getAppointmentData();
    });
  }

  /**
   * Get all data of appointment
   */
  public async getAppointmentData(): Promise<void> {
  }

  /**
   * Opens appointment edit form
   *
   * @param appointmentId id of appointment
   */
  public editAppointment(appointmentId: AppointmentId): void {
  }

  /**
   * Opens appointment deletion popup
   *
   * @param appointmentId id of appointment
   */
  public deleteAppointment(appointmentId: AppointmentId): void {
  }
}
