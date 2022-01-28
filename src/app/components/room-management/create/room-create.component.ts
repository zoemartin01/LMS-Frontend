import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import { RoomService } from "../../../services/room.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})

/**
 * Component for the room create popup
 *
 *
 */
export class RoomCreateComponent {
  public roomCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', Validators.required),
    maxConcurrentBookings: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
    autoAcceptBookings: new FormControl(false, Validators.required),
    /*
    availableTimeslots: new FormControl(''),
    unavailableTimeslots: new FormControl(''),
    TODO tabelle
     */
  });

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public roomService: RoomService,  public activeModal: NgbActiveModal) {
  }

  /**
   * Creates room with data
   */
  public async createRoom(): Promise<void> {

    if (this.roomCreateForm.valid) {
      const name = this.roomCreateForm.value.name;
      const description = this.roomCreateForm.value.description;
      const maxConcurrentBookings = this.roomCreateForm.value.maxConcurrentBookings;
      const autoAcceptBookings = this.roomCreateForm.value.autoAcceptBookings;
      //const availableTimeslots = this.roomCreateForm.value.availableTimeslots;
      //const unavailableTimeslots = this.roomCreateForm.value.unavailableTimeslots;
      this.roomService.createRoom(name, description, maxConcurrentBookings, autoAcceptBookings).subscribe({
        //TODO  , availableTimeslots, unavailableTimeslots
        next: () => {
          this.activeModal.close('created');
        }, error: error => {
          console.error('There was an error!', error);
        }
      });
    } else {
      console.log('Invalid form data')
    }
  }
}
