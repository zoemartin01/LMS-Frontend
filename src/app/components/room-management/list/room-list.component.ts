import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";
import {UserService} from "../../../services/user.service";
import {RoomViewComponent} from "../view/room-view.component";
import {RoomEditComponent} from "../edit/room-edit.component";
import {RoomDeleteComponent} from "../delete/room-delete.component";
import {RoomCreateComponent} from "../create/room-create.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})

/**
 * Component for the room list page
 *
 *
 */
export class RoomListComponent implements OnInit {
  public rooms: Room[] = [];

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public roomService: RoomService, public userService: UserService, private modalService: NgbModal) {
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
    this.roomService.getRoomsData().subscribe({
      next: res => {
        this.rooms = res;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens room create form
   */
  public openRoomCreationForm(): void {
    const modal = this.modalService.open(RoomCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getRooms();
      }
    });
  }

  /**
   * Opens room view
   *
   * @param {RoomId} roomId id of room to view
   */
  public openRoomView(roomId: RoomId): void {
    const modal = this.modalService.open(RoomViewComponent);
    modal.componentInstance.room.id = roomId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getRooms();
      }
    });
  }

  /**
   * Opens room edit form
   *
   * @param {RoomId} roomId id of room to edit
   */
  public openRoomEditForm(roomId: RoomId): void {
    const modal = this.modalService.open(RoomEditComponent);
    modal.componentInstance.room.id = roomId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getRooms();
      }
    });
  }

  /**
   * Opens room deletion confirmation dialog
   *
   * @param {roomId} roomId id of room to delete
   */
  public openRoomDeletionDialog(roomId: RoomId): void {
    const modal = this.modalService.open(RoomDeleteComponent);
    modal.componentInstance.room.id = roomId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getRooms();
      }
    });
  }
}
