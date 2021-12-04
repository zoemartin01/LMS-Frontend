import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all rooms with data
   */
  // @ts-ignore
  public getRoomsData(): Promise<void> {
  }

  /**
   * Creates room with data
   * @param roomName name of room
   * @param description description
   * @param maxConBookings maximum of concurrent bookings possible
   */
  // @ts-ignore
  public createRoom(roomName: string, description: string, maxConBookings: number): Promise<void> {

  }
  //TODO (un-)available times setRoomData

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

  /**
   * Deletes room
   * @param roomId id of room
   */
  // @ts-ignore
  public deleteRoom(roomId: number) : Promise<void> {

  }
}
