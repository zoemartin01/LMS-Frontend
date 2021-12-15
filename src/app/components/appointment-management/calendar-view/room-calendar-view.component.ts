import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { Room } from "../../../types/room";
import {RoomId} from "../../../types/aliases/room-id";

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
      this.room.id = params['id'];
      this.getRoomData();
      this.getAppointmentsForRoom(this.room.id);
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
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {
  }

  /**
   * Gets appointment data of all appointments of one room
   *
   * @param {RoomId} roomId id of room
   */
  public async getAppointmentsForRoom(roomId: RoomId): Promise<void> {
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
