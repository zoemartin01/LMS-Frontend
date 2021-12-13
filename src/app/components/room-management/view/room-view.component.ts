import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})

/**
 * Component for the room view site, to view one room in detail
 */
export class RoomViewComponent implements OnInit {
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConBookings: 1,
    automaticRequestAcceptance: null,
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
  private async getRoomData() : Promise<void> {
  }

  /**
   * Opens room edit form
   */
  public openRoomEditForm(): void {
  }

  /**
   * Opens room delete confirmation popup
   */
  public openRoomDeletionDialog(): void {
  }
}
