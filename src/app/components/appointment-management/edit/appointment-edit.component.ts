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
 * Component for the appointment edi site, to edit one appointment
 */
export class AppointmentEditComponent implements OnInit {
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
