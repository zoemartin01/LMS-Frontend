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
   * Get all data of room
   * @param roomId id of room
   */
  // @ts-ignore
  public getRoomData(roomId: number) : Promise<void> {

  }

  /**
   * Deletes room
   * @param roomId id of room
   */
  // @ts-ignore
  public deleteRoom(roomId: number) : Promise<void> {

  }

  /**
   * Changes data of room
   * @param roomId id of associated room
   * @param roomName name of room
   * @param description description
   * @param maxConBookings maximum of concurrent bookings possible
   */
  // @ts-ignore
  public editRoomData(roomId: number, roomName: string, description: string, maxConBookings: number): Promise<void> {

  }
  //TODO (un-)available times setRoomData
}
