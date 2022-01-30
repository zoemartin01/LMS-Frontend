import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";

import {AuthService} from "../../../services/auth.service";
import {AppointmentService} from "../../../services/appointment.service";
import {RoomService} from "../../../services/room.service";

import {Appointment} from "../../../types/appointment";
import {Room} from "../../../types/room";
import {TimespanId} from "../../../types/aliases/timespan-id";
import {FormControl, FormGroup} from "@angular/forms";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-room-calendar-view',
  templateUrl: './room-calendar-view.component.html',
  styleUrls: ['./room-calendar-view.component.scss']
})

/**
 * Component for the room calendar view page, to view all appointments and thus free slots of one room
 */
export class RoomCalendarViewComponent implements OnInit {
  public roomSelectForm: FormGroup = new FormGroup({
    roomSelector: new FormControl(''),
  });
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
    availableTimeslots: [],
    unavailableTimeslots: [],
  };
  public rooms: Room[] = [];
  public appointments: Appointment[] = [];
  public calendar: (Appointment|string|null)[][][] = [];
  public minTimeslot: number = 0;
  public columnKeys = Array.from(Array(1).keys());
  public week: moment.Moment = moment();
  public action: string = '';
  public weekText: string = '';
  public weekField: NgbDateStruct = new class implements NgbDateStruct {
    day = 1;
    month = 1;
    year = 1990;
  };

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
    this.getRooms();
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.room.id = params['id'];
        this.updateCalendar();
      }
    });

    this.setWeek(moment());
  }

  public setWeek(date: moment.Moment) {
    this.week = moment(date.subtract((date.day() + 6) % 7, 'days'));

    this.weekText = `${this.week.format("DD.MM.YYYY")} - ${moment(this.week).add(6, 'days')
      .format("DD.MM.YYYY")}`;

    this.weekField.day = +this.week.format("D");
    this.weekField.month = +this.week.format("M");
    this.weekField.year = +this.week.format("YYYY");

    this.updateCalendar();
  }

  public handleDatepickerChange() {
    this.setWeek(moment(`${this.weekField.year}-${this.weekField.month}-${this.weekField.day}`));
  }

  /**
   * Updates array to display appointments using the appointment
   * @private
   */
  private async updateCalendar() {
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
  public getRooms(): void {
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
  public changeRoom(roomId: string): void {
    this.room.id = roomId;
    this.updateCalendar();
  }

  public isAppointment(object: Appointment|string|null): boolean {
    return !(object === null || typeof object === 'string');
  }

  public isConfirmed(object: Appointment|string|null): boolean {
    return (<Appointment>object).confirmationStatus === ConfirmationStatus.accepted;
  }

  public parseAppointment(object: Appointment|string|null): Appointment {
    return <Appointment>object;
  }

  public getAppointmentId(object: Appointment|string|null): TimespanId {
    return (<Appointment>object).id;
  }

  public getRowspan(object: Appointment|string|null): number {
    const appointment = <Appointment>object;
    return moment(appointment.end).diff(moment(appointment.start), 'hours') + 1;
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {
    this.action = 'create';
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
    this.action = 'view';
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {
    this.action = 'edit';
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
