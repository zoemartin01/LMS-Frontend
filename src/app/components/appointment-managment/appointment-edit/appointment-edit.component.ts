import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import { Appointment } from "../../../types/appointment";
import {AppointmentService} from "../../../services/appointment.service";
//TODO create type appointment

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

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
  public getAppointmentData() : Promise<void> {
    //use this.appointment.id here and set this.appointment
  }

  /**
   * Changes data of appointment
   *
   * @param appointmentEditForm submitted creation form
   */
  public editAppointment(appointmentEditForm: NgForm): Promise<void> {
  }
}
