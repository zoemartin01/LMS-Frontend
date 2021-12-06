import { Component, OnInit } from '@angular/core';

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { AppointmentId } from "../../../types/aliases/appointment-id";

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss']
})
export class AdminAppointmentListComponent implements OnInit {
  public appointments: Appointment[] = [];

  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Opens appointment creation form
   */
  public openCreationForm(): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param appointmentId id of appointment
   */
  public editAppointment(appointmentId: AppointmentId): void {
  }

  /**
   * Gets appointment data of all appointments
   */
  public async getAppointments(): Promise<void> {
  }

  /**
   * Opens appointment deletion popup
   *
   * @param appointmentId id of appointment
   */
  public deleteAppointment(appointmentId: AppointmentId): void {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param appointmentId id of appointment
   */
  public async acceptAppointmentRequest(appointmentId: AppointmentId): Promise<void> {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: AppointmentId): Promise<void> {
  }
}
