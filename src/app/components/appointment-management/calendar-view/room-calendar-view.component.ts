import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

import { AppointmentDeleteComponent } from "../delete/appointment-delete.component";

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
    autoAcceptBookings: null,
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
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: NgbModal) {
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
   * Sets current week for calendar
   * @param {moment.Moment} date date in a week
   */
  public setWeek(date: moment.Moment): void {
    this.week = moment(date.subtract((date.day() + 6) % 7, 'days').hours(0).minutes(0).seconds(0)
      .milliseconds(0));

    this.weekText = `${this.week.format("DD.MM.YYYY")} - ${moment(this.week).add(6, 'days')
      .format("DD.MM.YYYY")}`;

    this.weekField.day = +this.week.format("D");
    this.weekField.month = +this.week.format("M");
    this.weekField.year = +this.week.format("YYYY");

    this.updateCalendar();
  }

  /**
   * Handles change of datepicker
   */
  public handleDatepickerChange(): void {
    this.setWeek(moment(`${this.weekField.year}-${this.weekField.month}-${this.weekField.day}`));
  }

  /**
   * Updates array to display appointments using the appointment
   */
  public async updateCalendar(): Promise<void> {
    if (this.room.id) {
      this.roomService.getRoomCalendar(this.room.id, moment(this.week.format()).unix()).subscribe({
        next: (res: { calendar: (Appointment|string|null)[][][], minTimeslot: number }) => {
          this.calendar = res.calendar;
          this.minTimeslot = res.minTimeslot;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  /**
   * Gets all rooms
   */
  public async getRooms(): Promise<void> {
    this.roomService.getRoomsData().subscribe({
      next: (rooms: Room[]) => {
        this.rooms = rooms;
      },
      error: error => {
        console.error('There was an error!', error);
      }
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
  public openAppointmentCreationForm(day: number, slot: number): void {
    this.action = 'create';
    this.appointmentCreationStart = moment(moment(this.week).add(day, 'days')
      .hours(slot + this.minTimeslot));
  }

  /**
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
    this.action = 'view';
    this.currentAppointmentId = <string>appointmentId;
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
