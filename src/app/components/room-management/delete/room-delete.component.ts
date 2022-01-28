import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.scss']
})

/**
 * Component for the deletion of a room
 *
 *
 */
export class RoomDeleteComponent implements OnInit {
  public roomDeleteForm: FormGroup = new FormGroup({
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
   */
  constructor(public roomService: RoomService, private route: ActivatedRoute, public activeModal: NgbActiveModal) {
    this.roomDeleteForm.disable();
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
    this.roomService.getRoomData(this.room.id).subscribe({
      next: res => {
        this.room = res;
        this.roomDeleteForm.controls['name'].setValue(res.name);
        this.roomDeleteForm.controls['description'].setValue(res.description);
        this.roomDeleteForm.controls['maxConcurrentBookings'].setValue(res.maxConcurrentBookings);
        this.roomDeleteForm.controls['autoAcceptBookings'].setValue(res.autoAcceptBookings);
        //this.roomEditForm.controls['availableTimeslots'].setValue(res.availableTimeslots);
        //this.roomEditForm.controls['unavailableTimeslots'].setValue(res.unavailableTimeslots);
        //TODO in backend this.roomEditForm.controls['appointments'].setValue(res.appointments);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
