import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.scss']
})

/**
 * Component for the deletion of a room
 * @typedef {Component} RoomDeleteComponent
 * @class
 */
export class RoomDeleteComponent implements OnInit {
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
    });
  }

  /**
   * Deletes room
   */
  public async deleteRoom(): Promise<void> {
  }
}
