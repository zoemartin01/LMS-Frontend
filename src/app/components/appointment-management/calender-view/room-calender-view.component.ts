import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { AppointmentId } from "../../../types/aliases/appointment-id";
import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-calender-view',
  templateUrl: './room-calender-view.component.html',
  styleUrls: ['./room-calender-view.component.scss']
})
export class RoomCalenderViewComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
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
   * Gets appointment data of all appointments of one room
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
