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
   * @param name
   * @param description
   * @param maxConBookings
   */
  public setData(name: string, description: string, maxConBookings: number) {

  }
  //TODO (un-)available times set data
  //TODO table of room
}
