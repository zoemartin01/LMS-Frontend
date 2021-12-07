import { Component, OnInit } from '@angular/core';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  public rooms: Room[] = [];

  constructor(public roomService: RoomService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all rooms with data
   */
  public getRoomsData(): Promise<void> {
  }

  /**
   * Opens room creation form
   */
  public openCreationForm(): void {
  }

  /**
   * Opens room edit form
   *
   * @param {roomId} roomId id of room
   */
  public editRoom(roomId: RoomId): void {
  }

  /**
   * Deletes room
   *
   * @param {roomId} roomId id of room
   */
  public deleteRoom(roomId: number) : Promise<void> {
  }
}
