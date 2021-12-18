import { Component, OnInit } from '@angular/core';

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";

@Component({
  selector: 'app-personal-appointment-list',
  templateUrl: './personal-appointment-list.component.html',
  styleUrls: ['./personal-appointment-list.component.scss']
})

/**
 * Component for the personal appointments list site, to view all appointments of one user
 * @typedef {Component} PersonalAppointmentListComponent
 * @class
 */
export class PersonalAppointmentListComponent implements OnInit {
  public appointments: Appointment[] = [];

  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getAllAppointmentsForCurrentUser();
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {
  }

  /**
   * Gets appointment data of all appointments for current user
   */
  public async getAllAppointmentsForCurrentUser(): Promise<void> {
  }

  /**
   * Opens appointment deletion popup
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async acceptAppointmentRequest(appointmentId: TimespanId): Promise<void> {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: TimespanId): Promise<void> {
  }
}
