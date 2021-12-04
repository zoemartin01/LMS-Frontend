import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
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

  /**
   * Get all data of room
   * @param roomId id of room
   */
  // @ts-ignore
  public getRoomData(roomId: number) : Promise<void> {

  }
}
