import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { SidebarWarningComponent } from "../../../appointment-management/sidebar-warning/sidebar-warning.component";
import { TimeslotDeleteComponent } from "../delete/timeslot-delete.component";

import { RoomService } from "../../../../services/room.service";

import { TimespanId } from "../../../../types/aliases/timespan-id";
import { Room } from "../../../../types/room";
import { PagedResponse } from 'src/app/types/paged-response';

@Component({
  selector: 'app-timeslots-calendar-view',
  templateUrl: './timeslots-calendar-view.component.html',
  styleUrls: ['./timeslots-calendar-view.component.scss']
})

/**
 * Component for the timeslots calendar view page, to view all available and unavailable timeslots of a room
 */
export class TimeslotsCalendarViewComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  public rooms: Room[] = [];
  public calendar: (string|null)[][] = [];
  public action: string = '';
  public currentTimeslotId: TimespanId = '';
  public timeslotCreationStart: moment.Moment|null = null;
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
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRooms();
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.changeRoom(params['id']);
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
    this.closeSidebar(false);
  }

  /**
   * Handles change of datepicker
   */
  public handleDatepickerChange(): void {
    this.setWeek(moment(`${this.weekField.year}-${this.weekField.month}-${this.weekField.day}`));
  }

  /**
   * Updates array to display timeslots
   */
  public async updateCalendar(): Promise<void> {
    if (this.room.id) {
      this.roomService.getAvailabilityCalendar(this.room.id, moment(this.week.format()).unix()).subscribe({
        next: (res: (string|null)[][]) => {
          this.calendar = res;
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
  public async changeRoom(roomId: string): Promise<void> {
    if (roomId === this.room.id) {
      return;
    }

    this.roomService.getRoomData(roomId).subscribe({
      next: (room: Room) => {
        this.room = room;
        this.updateCalendar();
        this.closeSidebar(false);
        history.pushState(null, '', `/room/${this.room.id}/timeslots/calendar`);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Returns specified day of week as moment
   * @param dayOfWeek
   */
  public getDayOfWeek(dayOfWeek: number): moment.Moment {
    return moment(this.week).add((dayOfWeek + 6) % 7, 'days');
  }

  /**
   * Returns object typed as string
   *
   * @param {string|null} object appointment
   */
  public parseString(object: string|null): string {
    return <string>object;
  }

  /**
   * Opens timeslot creation form with provided data
   *
   * @param {number} day day of week
   * @param {number} slot slot in the calendar
   */
  public openTimeslotCreationForm(day: number, slot: number): void {
    if (this.action === '') {
      this.action = 'create';
      this.timeslotCreationStart = moment(moment(this.week).add(day, 'days')
        .hours(slot));
    } else {
      this.showSidebarAlreadyOpenError();
    }
  }

  /**
   * Opens timeslot view
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public openTimeslotView(timeslotId: TimespanId): void {
    if (this.action === '') {
      this.action = 'view';
      this.currentTimeslotId = <string>timeslotId;
    } else {
      this.showSidebarAlreadyOpenError();
    }
  }

  /**
   * Opens timeslot edit form
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public openTimeslotEditForm(timeslotId: TimespanId): void {
    if (this.action === '') {
      this.action = 'edit';
      this.currentTimeslotId = <string>timeslotId;
    } else {
      this.showSidebarAlreadyOpenError();
    }
  }

  /**
   * Shows an error popup that sidebar is already opened
   */
  public showSidebarAlreadyOpenError() {
    this.modalService.open(SidebarWarningComponent);
  }

  /**
   * Closes sidebar and reloads data when needed
   *
   * @param isDirty
   */
  public closeSidebar(isDirty: boolean) {
    this.action = '';
    this.currentTimeslotId = '';
    this.timeslotCreationStart = null;

    if (isDirty) {
      this.updateCalendar();
    }
  }

  /**
   * Opens timeslot deletion dialog
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public async openTimeslotDeletionDialog(timeslotId: TimespanId): Promise<void> {
    this.action = '';
    const modal = this.modalService.open(TimeslotDeleteComponent);
    modal.componentInstance.timeslot.id = timeslotId;
    modal.componentInstance.timeslot.room.id = this.room.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.updateCalendar();
      }
    });

  }
}
