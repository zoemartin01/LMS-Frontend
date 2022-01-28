import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})

/**
 * Component for the room edit popup
 *
 *
 */
export class RoomEditComponent implements OnInit {
  public roomEditForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', Validators.required),
    maxConcurrentBookings: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*')
    ]),
    autoAcceptBookings: new FormControl('', Validators.required),
    /*
    availableTimeslots: new FormControl(''),
    unavailableTimeslots: new FormControl(''),
    TODO tabelle
     */
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
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param activeModal
   */
  constructor(public roomService: RoomService, private route: ActivatedRoute, public activeModal: NgbActiveModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getRoomData();
    });
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
        //this.roomEditForm.controls['availableTimeslots'].setValue(res.availableTimeslots);
        //this.roomEditForm.controls['unavailableTimeslots'].setValue(res.unavailableTimeslots);
        //TODO in backend this.roomEditForm.controls['appointments'].setValue(res.appointments);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Changes data of room
   */
  public async editRoomData(): Promise<void> {
    this.roomService.editRoomData(this.room.id, {
      name: this.roomEditForm.controls['name'].value,
      description: this.roomEditForm.controls['description'].value,
      maxConcurrentBookings: this.roomEditForm.controls['maxConcurrentBookings'].value,
      autoAcceptBookings: this.roomEditForm.controls['autoAcceptBookings'].value,
     // availableTimeslots: this.roomEditForm.controls['availableTimeslots'].value,
      //unavailableTimeslots: this.roomEditForm.controls['unavailableTimeslots'].value
      }
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
