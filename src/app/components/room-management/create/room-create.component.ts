import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { RoomService } from "../../../services/room.service";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})

/**
 * Component for the room create site, to create a new room
 */
export class RoomCreateComponent implements OnInit {

  constructor(public roomService: RoomService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Creates room with data
   *
   * @param {NgForm} roomCreationForm submitted creation form
   */
  public async createRoom(roomCreationForm: NgForm): Promise<void> {
  }
}
