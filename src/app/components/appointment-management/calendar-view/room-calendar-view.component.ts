import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

import { AuthService } from "../../../services/auth.service";
import { AppointmentService } from "../../../services/appointment.service";
import { RoomService } from "../../../services/room.service";

import { Appointment } from "../../../types/appointment";
import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";
import { RoomTimespan } from "../../../types/room-timespan";
import { TimespanId } from "../../../types/aliases/timespan-id";

@Component({
  selector: 'app-room-calendar-view',
  templateUrl: './room-calendar-view.component.html',
  styleUrls: ['./room-calendar-view.component.scss']
})

/**
 * Component for the room calendar view page, to view all appointments and thus free slots of one room
 *
 *
 */
export class RoomCalendarViewComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    automaticRequestAcceptance: null,
    availableTimeslots: [],
    unavailableTimeslots: [],
  };
  public rooms: Room[] = [];
  public appointments: Appointment[] = [];
  public displayTimespans: RoomTimespan[][][] = [];
  public minTimeslot: number = 0;
  public columnKeys = Array.from(Array(10).keys());
  public now: moment.Moment = moment();

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(
    public appointmentService: AppointmentService,
    public authService: AuthService,
    public roomService: RoomService,
    private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.room.id = params['id'];
      this.updateCalendar();
      this.getRooms();
    });
  }

  /**
   * Gets all data of room
   */
  public async getRoomData() : Promise<void> {
  }

  /**
   * Gets appointment data of all appointments of one room
   *
   * @param {RoomId} roomId id of room
   */
  public async getAppointmentsForRoom(roomId: RoomId): Promise<void> {
  }

  /**
   * Updates array to display appointments using the appointment
   * @private
   */
  private async updateCalendar() {
    this.getRoomData().then(() => {
      this.getAppointmentsForRoom(this.room.id).then(() => {
        let result = this.roomService.getTimespansAsCalendar(this.room, this.appointments);
        this.displayTimespans = result.displayTimespans;
        this.minTimeslot = result.minTimeslot;
      });
    });
  }

  /**
   * Gets all rooms
   */
  public getRooms(): void {
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
