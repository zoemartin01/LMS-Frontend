import { Component, OnInit } from '@angular/core';

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss']
})

/**
 * Component for the admin appointment list page, to view all appointments and all requested appointments
 * @typedef {Component} AdminAppointmentListComponent
 * @class
 */
export class AdminAppointmentListComponent implements OnInit {
  public appointments: Appointment[] = [];

  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {
  }

  /**
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {
  }

  /**
   * Gets appointment data of all appointments
   */
  public async getAppointments(): Promise<void> {
  }

  /**
   * Opens appointment deletion dialog
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
   * Sets appointment request to declined
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: TimespanId): Promise<void> {
  }
}
