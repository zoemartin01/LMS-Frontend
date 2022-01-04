import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { AuthService } from "../../../services/auth.service";
import { AppointmentService } from "../../../services/appointment.service";
import { RoomService } from "../../../services/room.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";
import { RoomTimespan } from "../../../types/room-timespan";
import * as moment from "moment";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 *
 *
 */
export class AppointmentEditComponent implements OnInit {
  public appointment: Appointment = {
    id: null,
    userId: null,
    roomId: null,
    roomName: '',
    start: null,
    end: null,
    type: RoomTimespanType.appointment,
    seriesId: null,
    confirmationStatus: ConfirmationStatus.unknown,
  };
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
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
  public startTimeSlots = Array.from(Array(5).keys());//@todo set dinamically
  public endTimeSlots = Array.from(Array(5).keys()).map(x => x + 8);//@todo set dinamically

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
      this.appointment.id = params['id'];
      this.room.id = params['room_id'];
      this.updateCalendar();
      this.getAppointmentData();
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
   * Gets all data for one appointment
   */
  public getAppointmentData(): void {
  }

  /**
   * Gets all rooms
   */
  public getRooms(): void {
  }

  /**
   * Changes data of appointment
   *
   * @param {NgForm} appointmentEditForm submitted edit form
   */
  public async editAppointment(appointmentEditForm: NgForm): Promise<void> {
  }
}
