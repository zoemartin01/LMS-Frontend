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
   * Lists all rooms with Name
   */
  // @ts-ignore
  public getData(): Promise<void> {
  }

  /**
   * Go to view room page
   */
  // @ts-ignore
  public goToRoomView(): Promise<void> {
  }

  /**
   * Go to edit room page
   */
  // @ts-ignore
  public goToRoomEdit(): Promise<void> {
  }

  /**
   * Go to create room page
   */
  // @ts-ignore
  public goToRoomCreate(): Promise<void> {

  }
  //TODO why unused
}
