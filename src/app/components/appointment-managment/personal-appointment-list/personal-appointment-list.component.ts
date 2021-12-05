import { Component, OnInit } from '@angular/core';
import {AppointmentId} from "../../../types/aliases/appointment-id";
import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-personal-appointment-list',
  templateUrl: './personal-appointment-list.component.html',
  styleUrls: ['./personal-appointment-list.component.scss']
})
export class PersonalAppointmentListComponent implements OnInit {

  constructor(public appointmentService: AppointmentService) { }

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
   * Opens appointment cancel popup
   *
   * @param appointmentId id of appointment
   */
  public cancelAppointment(appointmentId: AppointmentId): Promise<void> {
  }
}
