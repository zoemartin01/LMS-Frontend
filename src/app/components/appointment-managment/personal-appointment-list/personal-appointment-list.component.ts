import { Component, OnInit } from '@angular/core';
import {AppointmentId} from "../../../types/aliases/appointment-id";

@Component({
  selector: 'app-personal-appointment-list',
  templateUrl: './personal-appointment-list.component.html',
  styleUrls: ['./personal-appointment-list.component.scss']
})
export class PersonalAppointmentListComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all appointments with associated data
   */
  public getAppointmentsData(): Promise<void> {

  }

  /**
   * Cancel the whole series of appointments
   * @param appointmentId Id of an appointment
   * @param seriesId Id of the associated series
   */
  public cancelSeriesAppointment(appointmentId: number, seriesId: number): Promise<void> {

  }

  /**
   * Cancel a single appointment of the whole series of appointments
   * @param appointmentId Id of an appointment
   * @param seriesId Id of the associated series
   */
  public cancelSingleSeriesAppointment(appointmentId: number, seriesId: number): Promise<void> {

  }

  /**
   * Cancel a single appointment
   * @param appointmentId Id of an appointment
   */
  public cancelSingleAppointment(appointmentId: number): Promise<void> {

  }
}
