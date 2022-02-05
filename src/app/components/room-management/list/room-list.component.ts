import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomCreateComponent } from "../create/room-create.component";
import { RoomDeleteComponent } from "../delete/room-delete.component";
import { RoomEditComponent } from "../edit/room-edit.component";
import { RoomViewComponent } from "../view/room-view.component";

import { RoomService } from "../../../services/room.service";
import { UserService } from "../../../services/user.service";

import { Room } from "../../../types/room";
import { RoomId } from "../../../types/aliases/room-id";
import { PagedList } from 'src/app/types/paged-list';

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
  public rooms: PagedList<Room> = new PagedList<Room>();

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
  public async getRooms(page: number = this.rooms.page): Promise<void> {
    const pageSize = this.rooms.pageSize;
    const offset = (page - 1) * pageSize;

    this.roomService.getRoomsData(pageSize, offset).subscribe({
      next: res => {
        this.rooms.parse(res, page);
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
