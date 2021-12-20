import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";

@Component({
  selector: 'app-appointment-delete',
  templateUrl: './appointment-delete.component.html',
  styleUrls: ['./appointment-delete.component.scss']
})

/**
 * Component for the deletion of an appointment or a series of appointments
 * @typedef {Component} AppointmentDeleteComponent
 * @class
 */
export class AppointmentDeleteComponent implements OnInit {
  public appointment: Appointment = {
    id: null,
    userId: null,
    roomId: null,
    start: null,
    end: null,
    type: RoomTimespanType.appointment,
    seriesId: null,
    confirmationStatus: ConfirmationStatus.unknown,
  };

  /**
   * Constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public appointmentService: AppointmentService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointment.id = params['id'];
      //@TODO need this?: this.appointment.seriesId = params['seriesId'];
    });
  }

  /**
   * Deletes appointment or series of appointments
   */
  public async deleteAppointment(): Promise<void> {
  }
}
