import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { AppointmentId } from "../../../types/aliases/appointment-id";
import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-calendar-view',
  templateUrl: './room-calendar-view.component.html',
  styleUrls: ['./room-calendar-view.component.scss']
})

/**
 * Component for the room calendar view site, to view all appointments and thus free slots of one room
 */
export class RoomCalendarViewComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
    automaticRequestAcceptance: null,
  };
  public appointments: Appointment[] = [];

  constructor(public appointmentService: AppointmentService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.room.id = +params['id'];
      this.getRoomData();
      this.getAppointments();
    });
  }

  /**
   * Get all data of room
   */
  private async getRoomData() : Promise<void> {
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: AppointmentId): void {
  }

  /**
   * Gets appointment data of all appointments of one room
   */
  public async getAppointments(): Promise<void> {
  }

  /**
   * Opens appointment deletion popup
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: AppointmentId): void {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public async acceptAppointmentRequest(appointmentId: AppointmentId): Promise<void> {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: AppointmentId): Promise<void> {
  }
}
