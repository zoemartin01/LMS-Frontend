import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { RoomDeleteComponent } from "../delete/room-delete.component";
import { RoomEditComponent } from "../edit/room-edit.component";

import { RoomService } from "../../../services/room.service";

import { Room } from "../../../types/room";

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
    description: new FormControl(''),
    maxConcurrentBookings: new FormControl(1, Validators.required),
    autoAcceptBookings: new FormControl(false, Validators.required),
  });
  public room: Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  public dirty: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {Router} router router providing navigation
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
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
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens page to view and edit available and unavailable timeslots
   */
  public openTimeslotPage() {
    this.activeModal.close(this.dirty ? 'dirty' : 'aborted');
    this.router.navigateByUrl(`/room/${this.room.id}/timeslots/calendar`);
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
        this.dirty = true;
      }
    });
  }

  /**
   * Opens room deletion confirmation dialog
   */
  public openRoomDeletionDialog(): void {
    const modal = this.modalService.open(RoomDeleteComponent);
    modal.componentInstance.room.id = this.room.id;
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
}
