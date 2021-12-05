import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppointmentId} from "../../../types/aliases/appointment-id";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  constructor() { }

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

}
