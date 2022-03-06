import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { RoomService } from "../../../services/room.service";
import { UtilityService } from "../../../services/utility.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.scss']
})

/**
 * Component for the deletion of a room
 */
export class RoomDeleteComponent implements OnInit {
  public roomDeleteForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    maxConcurrentBookings: new FormControl(1),
    autoAcceptBookings: new FormControl(false),
  });
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public roomService: RoomService,
    public utilityService: UtilityService,
    public activeModal: NgbActiveModal
  ) {
    this.roomDeleteForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRoomData();
  }

  /**
   * Deletes room
   */
  public async deleteRoom(): Promise<void> {
    this.roomService.deleteRoom(this.room.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all data of room
   */
  public async getRoomData() : Promise<void> {
    this.errorMessage = '';
    this.roomService.getRoomData(this.room.id).subscribe({
      next: res => {
        this.room = res;
        this.roomDeleteForm.controls['name'].setValue(res.name);
        this.roomDeleteForm.controls['description'].setValue(res.description);
        this.roomDeleteForm.controls['maxConcurrentBookings'].setValue(res.maxConcurrentBookings);
        this.roomDeleteForm.controls['autoAcceptBookings'].setValue(res.autoAcceptBookings);
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    })
  }
}
