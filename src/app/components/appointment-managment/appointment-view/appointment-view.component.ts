import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppointmentId} from "../../../types/aliases/appointment-id";
import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  constructor(public appointmentService: AppointmentService) { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all appointments with associated data
   */
  public getAppointmentData(): Promise<void> {

  }

  /**
   * Opens appointment edit form
   *
   * @param appointmentId id of appointment
   */
  public editAppointment(appointmentId: AppointmentId): Promise<void> {
  }

  /**
   * Opens appointment cancel popup
   *
   * @param appointmentId id of appointment
   */
  public cancelAppointment(appointmentId: AppointmentId): Promise<void> {
  }
}
