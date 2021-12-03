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
   * Changes data of room
   * @param name
   * @param description
   * @param maxConBookings
   */
  public setData(name: string, description: string, maxConBookings: number) {

  }
  //TODO (un-)available times set data
  //TODO also used in room-edit
}
