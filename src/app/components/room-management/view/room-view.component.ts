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
 * Component for the room view popup
 */
export class RoomViewComponent implements OnInit {
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
  }

  /**
   * Opens room edit form
   */
  public openRoomEditForm(): void {
  }

  /**
   * Opens room deletion confirmation dialog
   */
  public openRoomDeletionDialog(): void {
  }
}
