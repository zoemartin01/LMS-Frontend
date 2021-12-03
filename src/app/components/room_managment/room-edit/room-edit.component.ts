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
  Name, Description, Maximum concurrent bookings, Available times for booking, Unavailable times for booki
   **/
  public setData(name: string, description: string, maxConBookings: number) {

  }
  //TODO (un-)available times
  //TODO table
}
