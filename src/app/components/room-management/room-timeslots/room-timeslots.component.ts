import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-timeslots',
  templateUrl: './room-timeslots.component.html',
  styleUrls: ['./room-timeslots.component.scss']
})

/**
 * Component for the room edit popup, to edit the available and unavailable timeslots of one room
 *
 *
 */
export class RoomTimeslotsComponent implements OnInit {

  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
    automaticRequestAcceptance: null,
    availableTimeslots: [],
    unavailableTimeslots: [],
  };

  /**
   * Constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public roomService: RoomService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.room.id = params['id'];
      this.getRoomData();
    });
  }

  /**
   * Gets all data of room
   */
  public async getRoomData(): Promise<void> {
    //use this.room.id here and set this.room
  }

  /**
   * Changes data of timeslot of room
   *
   * @param {NgForm} timeslotEditForm submitted timeslot edit form
   */
  public async editTimeslotData(timeslotEditForm: NgForm): Promise<void> {
  }
}
