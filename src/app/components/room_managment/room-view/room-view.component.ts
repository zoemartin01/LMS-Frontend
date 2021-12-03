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
   * lists Name, Description, Maximum concurrent bookings, Available times for booking, Unavailable times for booking
   */

  // @ts-ignore
  public getRoomData() : Observable<any> {

  }

  //TODO table room available

  /**
   * gets to edit room page
   */
  // @ts-ignore
  public getToRoomEdit() : Observable<any> {

  }
}
