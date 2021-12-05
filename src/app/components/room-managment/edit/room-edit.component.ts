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
export class RoomEditComponent implements OnInit {
  //@todo add fields to room type
  public room: Room = {
    id: null,
  };

  constructor(public roomService: RoomService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.room.id = +params['id'];
      this.getRoomData();
    });
  }

  /**
   * Get all data of room
   */
  public getRoomData() : Promise<void> {
    //use this.room.id here and set this.room
  }

  /**
   * Changes data of room
   *
   * @param roomEditForm submitted creation form
   */
  public editRoomData(roomEditForm: NgForm): Promise<void> {
  }

  //@todo (un-)available times setRoomData
}
