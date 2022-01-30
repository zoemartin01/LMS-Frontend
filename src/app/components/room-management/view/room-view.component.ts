import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute } from "@angular/router";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoomEditComponent} from "../edit/room-edit.component";
import {RoomDeleteComponent} from "../delete/room-delete.component";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})

/**
 * Component for the room view popup
 */
export class RoomViewComponent implements OnInit {
  public roomViewForm: FormGroup = new FormGroup({
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
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public roomService: RoomService, private route: ActivatedRoute,public activeModal: NgbActiveModal, private modalService: NgbModal) {
    this.roomViewForm.disable();
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
        this.roomViewForm.controls['name'].setValue(res.name);
        this.roomViewForm.controls['description'].setValue(res.description);
        this.roomViewForm.controls['maxConcurrentBookings'].setValue(res.maxConcurrentBookings);
        this.roomViewForm.controls['autoAcceptBookings'].setValue(res.autoAcceptBookings);
        //this.roomViewForm.controls['availableTimeslots'].setValue(res.availableTimeslots);
        //this.roomViewForm.controls['unavailableTimeslots'].setValue(res.unavailableTimeslots);
        //TODO in backend this.roomViewForm.controls['appointments'].setValue(res.appointments);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens room edit form
   */
  public openRoomEditForm(): void {
    const modal = this.modalService.open(RoomEditComponent);
    modal.componentInstance.room.id = this.room.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getRoomData();
      }
    });
  }

  /**
   * Opens room deletion confirmation dialog
   */
  public openRoomDeletionDialog(): void {
    const modal = this.modalService.open(RoomDeleteComponent);
    modal.componentInstance.user.id = this.room.id;
    modal.result.then((result) => {
      if (result === 'deleted') {
        this.activeModal.close('dirty');
        return;
      }

      if (result !== 'aborted') {
        this.getRoomData();
        this.dirty = true;
      }
    });
  }

  //TODO calender
}
