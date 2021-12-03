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
   * lists all rooms
   */
  // @ts-ignore
  public getNames(): Observable<any> {
  }

  /**
   * get to view room page
   */
  // @ts-ignore
  public goToRoomView(): Observable<any> {
  }

  /**
   * get to edit room page
   */
  // @ts-ignore
  public goToRoomEdit(): Observable<any> {
  }

  /**
   * get to create room page
   */
  // @ts-ignore
  public goToRoomCreate(): Observable<any> {
  }
  //TODO method is unused
}
