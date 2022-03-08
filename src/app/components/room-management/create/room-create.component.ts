import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { RoomService } from "../../../services/room.service";
import { UtilityService } from "../../../services/utility.service";
import {InventoryItem} from "../../../types/inventory-item";
import {Room} from "../../../types/room";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})

/**
 * Component for the room create popup
 */
export class RoomCreateComponent {
  public roomCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    maxConcurrentBookings: new FormControl(1, Validators.required),
    autoAcceptBookings: new FormControl(false, Validators.required),
  });
  public errorMessage: string = '';

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
  }

  /**
   * Creates room with data
   */
  public async createRoom(): Promise<void> {
    this.errorMessage = '';

    if (!this.roomCreateForm.valid) {
      this.errorMessage = 'You need to fill in all required fields!';
      return;
    }

    const name = this.roomCreateForm.value.name;
    const description = this.roomCreateForm.value.description;
    const maxConcurrentBookings = this.roomCreateForm.value.maxConcurrentBookings;
    const autoAcceptBookings = this.roomCreateForm.value.autoAcceptBookings;
    this.roomService.createRoom(name, description, maxConcurrentBookings, autoAcceptBookings).subscribe({
      next: (room: Room) => {
        if (room.id !== null) {
          this.activeModal.close(`created ${room.id}`);
        }
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
