import { Component, OnInit } from '@angular/core';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})

/**
 * Component for the room list page
 * @typedef {Component} RoomListComponent
 * @class
 */
export class RoomListComponent implements OnInit {
  public rooms: Room[] = [];

  /**
   * Constructor
   * @param {RoomService} roomService service providing room functionalities
   */
  constructor(public roomService: RoomService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRooms()
  }

  /**
   * Gets all rooms with data
   */
  public async getRooms(): Promise<void> {
  }

  /**
   * Opens room create form
   */
  public openRoomCreationForm(): void {
  }

  /**
   * Opens room view
   *
   * @param {RoomId} roomId id of room to view
   */
  public openRoomView(roomId: RoomId): void {
  }

  /**
   * Opens room edit form
   *
   * @param {RoomId} roomId id of room to edit
   */
  public openRoomEditForm(roomId: RoomId): void {
  }

  /**
   * Opens room deletion confirmation dialog
   *
   * @param {roomId} roomId id of room to delete
   */
  public openRoomDeletionDialog(roomId: RoomId): void {
  }
}
