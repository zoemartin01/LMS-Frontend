import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

import { TimeslotCreateComponent } from "../create/timeslot-create.component";
import { TimeslotDeleteComponent } from "../delete/timeslot-delete.component";
import { TimeslotEditComponent } from "../edit/timeslot-edit.component";
import { TimeslotViewComponent } from "../view/timeslot-view.component";

import { AuthService } from '../../../../services/auth.service';
import { RoomService } from '../../../../services/room.service';
import { UserService } from '../../../../services/user.service';

import { RoomTimespan } from "../../../../types/room-timespan";
import { TimespanId } from "../../../../types/aliases/timespan-id";
import { Room } from "../../../../types/room";
import { PagedList } from '../../../../types/paged-list';
import { PagedResponse } from "../../../../types/paged-response";

@Component({
  selector: 'app-timeslots-list',
  templateUrl: './timeslots-list.component.html',
  styleUrls: ['./timeslots-list.component.scss']
})

/**
 * Component for the timeslot list page
 */
export class TimeslotsListComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  public rooms: Room[] = [];
  public availableTimeslots: PagedList<RoomTimespan> = new PagedList<RoomTimespan>();
  public unavailableTimeslots: PagedList<RoomTimespan> = new PagedList<RoomTimespan>();

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public roomService: RoomService,
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRooms()
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.room.id = params['id'];
        this.getTimeslots();
      }
    });
  }

  /**
   * Gets data of all timeslots
   */
  public async getTimeslots(): Promise<void> {
    await this.getAvailableTimeslots();
    await this.getUnavailableTimeslots();
  }

  /**
   * Gets data of all available timeslots
   *
   * @param {number} page current number of page
   */
  public async getAvailableTimeslots(page: number = this.availableTimeslots.page) : Promise<void> {
    const pageSize = this.availableTimeslots.pageSize;
    const offset = (page - 1) * pageSize;

    this.roomService.getAvailableTimeslots(this.room.id, pageSize, offset).subscribe({
        next: (res) => {
          this.availableTimeslots.parse(
            res,
            page,
            (timeslot: RoomTimespan) => {
              timeslot.start = moment(timeslot.start);
              timeslot.end = moment(timeslot.end);
              if (timeslot.maxStart !== null) timeslot.maxStart = moment(timeslot.maxStart)
              return timeslot;
            }
          );
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Gets data of all unavailable timeslots
   *
   * @param {number} page current number of page
   */
  public async getUnavailableTimeslots(page: number = this.unavailableTimeslots.page) : Promise<void> {
    const pageSize = this.unavailableTimeslots.pageSize;
    const offset = (page - 1) * pageSize;

    this.roomService.getUnavailableTimeslots(this.room.id, pageSize, offset).subscribe({
      next: (res) => {
        this.unavailableTimeslots.parse(
          res,
          page,
          (timeslot: RoomTimespan) => {
            timeslot.start = moment(timeslot.start);
            timeslot.end = moment(timeslot.end);
            if (timeslot.maxStart !== null) timeslot.maxStart = moment(timeslot.maxStart)
            return timeslot;
          }
        );
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
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
    this.getTimeslots();
  }

  /**
   * Opens timeslot creation form
   */
  public openTimeslotCreationForm(): void {
    const modal = this.modalService.open(TimeslotCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getTimeslots();
      }
    });
  }

  /**
   * Opens timeslot view
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public openTimeslotView(timeslotId: TimespanId): void {
    const modal = this.modalService.open(TimeslotViewComponent);
    modal.componentInstance.timeslot.id = timeslotId;
    modal.componentInstance.timeslot.room.id = this.room.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getTimeslots();
      }
    });
  }

  /**
   * Opens timeslot edit form
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public openTimeslotEditForm(timeslotId: TimespanId): void {
    const modal = this.modalService.open(TimeslotEditComponent);
    modal.componentInstance.timeslot.id = timeslotId;
    modal.componentInstance.timeslot.room.id = this.room.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getTimeslots();
      }
    });
  }

  /**
   * Opens timeslot deletion dialog
   *
   * @param {TimespanId} timeslotId id of timeslot
   */
  public openTimeslotDeletionDialog(timeslotId: TimespanId): void {
    const modal = this.modalService.open(TimeslotDeleteComponent);
    modal.componentInstance.timeslot.id = timeslotId;
    modal.componentInstance.timeslot.room.id = this.room.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getTimeslots();
      }
    });
  }
}
