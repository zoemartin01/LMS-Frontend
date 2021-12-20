import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})

/**
 * Component for the room edit popup
 * @typedef {Component} RoomEditComponent
 * @class
 */
export class RoomEditComponent implements OnInit {
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
  public async getRoomData() : Promise<void> {
    //use this.room.id here and set this.room
  }

  /**
   * Changes data of room
   *
   * @param {NgForm} roomEditForm submitted edit form
   */
  public async editRoomData(roomEditForm: NgForm): Promise<void> {
  }
}
