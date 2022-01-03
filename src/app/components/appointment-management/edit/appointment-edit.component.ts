import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { RoomTimespanType } from "../../../types/enums/timespan-type";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 *
 *
 */
export class AppointmentEditComponent implements OnInit {
  public appointment: Appointment = {
    id: null,
    userId: null,
    roomId: null,
    roomName: '',
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
      this.getAppointmentData();
    });
  }

  /**
   * Gets all data of appointment
   */
  public async getAppointmentData() : Promise<void> {
    //use this.appointment.id here and set this.appointment
  }

  /**
   * Changes data of appointment
   *
   * @param {NgForm} appointmentEditForm submitted edit form
   */
  public async editAppointment(appointmentEditForm: NgForm): Promise<void> {
  }
}
