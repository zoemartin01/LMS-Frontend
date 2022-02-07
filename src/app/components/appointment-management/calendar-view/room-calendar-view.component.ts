import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentDeleteComponent } from "../delete/appointment-delete.component";

import { AuthService } from "../../../services/auth.service";
import { RoomService } from "../../../services/room.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { Room } from "../../../types/room";
import { PagedResponse } from 'src/app/types/paged-response';

@Component({
  selector: 'app-room-calendar-view',
  templateUrl: './room-calendar-view.component.html',
  styleUrls: ['./room-calendar-view.component.scss']
})

/**
 * Component for the room calendar view page, to view all appointments and thus free slots of one room
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
  public calendar: (Appointment|string|null)[][][] = [];
  public minTimeslot: number = 0;
  public columnKeys = Array.from(Array(1).keys());
  public action: string = '';
  public currentAppointmentId: string = '';
  public appointmentCreationStart: moment.Moment|null = null;
  public week: moment.Moment = moment();
  public weekText: string = '';
  public weekField: NgbDateStruct = new class implements NgbDateStruct {
    day = 1;
    month = 1;
    year = 1990;
  };

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
    this.getRooms();
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.room.id = params['id'];
        this.updateCalendar();
      }

      if (params['date'] !== undefined) {
        this.setWeek(moment(params['date']));
      } else {
        this.setWeek(moment());
      }
    });
  }

  /**
   * Sets current week for calendar
   *
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
      next: (rooms: PagedResponse<Room>) => {
        this.rooms = rooms.data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all rooms
   */
  public changeRoom(roomId: string): void {
    this.room.id = roomId;
    this.updateCalendar();
  }

  /**
   * Checks if object is an appointment
   *
   * @param {Appointment|string|null} object object
   */
  public isAppointment(object: Appointment|string|null): boolean {
    return !(object === null || typeof object === 'string');
  }

  /**
   * Checks if appointment was confirmed
   *
   * @param {Appointment|string|null} object appointment
   */
  public isConfirmed(object: Appointment|string|null): boolean {
    return (<Appointment>object).confirmationStatus === ConfirmationStatus.accepted;
  }

  /**
   * Returns object typed as appointment
   *
   * @param {Appointment|string|null} object appointment
   */
  public parseAppointment(object: Appointment|string|null): Appointment {
    return <Appointment>object;
  }

  /**
   * Returns id of specified appointment
   *
   * @param {Appointment|string|null} object appointment
   */
  public getAppointmentId(object: Appointment|string|null): TimespanId {
    return (<Appointment>object).id;
  }

  /**
   * Returns row span for specified appointment
   *
   * @param {Appointment|string|null} object appointment
   */
  public getRowspan(object: Appointment|string|null): number {
    const appointment = <Appointment>object;
    return moment(appointment.end).hours() - moment(appointment.start).hours();
  }

  /**
   * Opens appointment creation form with provided data
   *
   * @param {number} day day of week
   * @param {number} slot slot in the calendar
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
    this.action = 'edit';
    this.currentAppointmentId = <string>appointmentId;
  }

  public closedSidebar(isDirty: boolean) {
    this.action = '';
    this.currentAppointmentId = '';
    this.appointmentCreationStart = null;

    if (isDirty) {
      this.updateCalendar();
    }
  }

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async openAppointmentDeletionDialog(appointmentId: TimespanId): Promise<void> {
    this.action = '';
    const modal = this.modalService.open(AppointmentDeleteComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.updateCalendar();
      }
    });

  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async acceptAppointmentRequest(appointmentId: TimespanId): Promise<void> {
    this.action = '';
    const modal = this.modalService.open(AppointmentDeleteComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.updateCalendar();
      }
    });
  }

  /**
   * Sets appointment request to declined
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: TimespanId): Promise<void> {
    this.action = '';
    const modal = this.modalService.open(AppointmentDeleteComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.updateCalendar();
      }
    });
  }
}
