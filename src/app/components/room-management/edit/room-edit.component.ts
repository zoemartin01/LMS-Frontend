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
 * Component for the room edit site, to edit one room
 */
export class RoomEditComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
    automaticRequestAcceptance: null,
    //TODO (un-)available timeslots?
  };

  constructor(public roomService: RoomService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.room.id = params['id'];
      this.getRoomData();
    });
  }

  /**
   * Get all data of room
   */
  public async getRoomData() : Promise<void> {
    //use this.room.id here and set this.room
  }

  /**
   * Changes data of room
   *
   * @param {NgForm} roomEditForm submitted creation form
   */
  public async editRoomData(roomEditForm: NgForm): Promise<void> {
  }
}
