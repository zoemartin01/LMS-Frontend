import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
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
}
