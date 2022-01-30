import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})

/**
 * Component for the room edit popup
 *
 */
export class RoomEditComponent implements OnInit {
  public roomEditForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', Validators.required),
    maxConcurrentBookings: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
    autoAcceptBookings: new FormControl(false, Validators.required),
  });
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
    availableTimeslots: [],
    unavailableTimeslots: [],
  };

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public roomService: RoomService, public activeModal: NgbActiveModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRoomData();
  }

  /**
   * Gets all data of room
   */
  public async getRoomData() : Promise<void> {
    this.roomService.getRoomData(this.room.id).subscribe({
      next: res => {
        this.room = res;

        this.roomEditForm.controls['name'].setValue(res.name);
        this.roomEditForm.controls['description'].setValue(res.description);
        this.roomEditForm.controls['maxConcurrentBookings'].setValue(res.maxConcurrentBookings);
        this.roomEditForm.controls['autoAcceptBookings'].setValue(res.autoAcceptBookings);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Toggles state of autoAcceptBookings
   */
  public toggleAutoAcceptBookings() {
    this.roomEditForm.controls['autoAcceptBookings'].setValue(!this.roomEditForm.controls['autoAcceptBookings'].value);
    this.roomEditForm.controls['autoAcceptBookings'].markAsDirty();
  }

  /**
   * Changes data of room
   */
  public async editRoomData(): Promise<void> {
    this.roomService.editRoomData(this.room.id,
      this.getDirtyValues(this.roomEditForm)
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all values of a form that are marked with a dirty bit
   *
   * @param {FormGroup} form form
   */
  public getDirtyValues(form: FormGroup) {
    let dirtyValues: { [key: string]: any} = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if ((<FormGroup>currentControl).controls)
            dirtyValues[key] = this.getDirtyValues(<FormGroup>currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
}
