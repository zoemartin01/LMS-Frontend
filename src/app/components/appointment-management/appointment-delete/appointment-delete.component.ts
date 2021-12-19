import { Component, OnInit } from '@angular/core';
import {Room} from "../../../types/room";
import {RoomService} from "../../../services/room.service";
import {ActivatedRoute} from "@angular/router";
import {Appointment} from "../../../types/appointment";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {AppointmentService} from "../../../services/appointment.service";

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
