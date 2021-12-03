import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists Name, Description, Maximum concurrent bookings, Available times for booking, Unavailable times for booking
   */
  // @ts-ignore
  public getRoomData() : Promise<void> {

  }

  //TODO show table "room availability times"

  /**
   * Deletes room
   * @param roomId
   */
  // @ts-ignore
  public deleteRoom(roomId: number) : Promise<void> {

  }
  //TODO deleteRoom used in room-list as well
  //TODO why unused

  /**
   * Gets to edit room page
   */
  // @ts-ignore
  public getToRoomEdit() : Promise<void> {

  }
}
