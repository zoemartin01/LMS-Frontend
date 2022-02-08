import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";

@Component({
  selector: 'app-timeslot-delete',
  templateUrl: './timeslot-delete.component.html',
  styleUrls: ['./timeslot-delete.component.scss']
})

/**
 * Component for the deletion of a timeslot or a series of timeslots
 */
export class TimeslotDeleteComponent implements OnInit {
  public timeslotDeleteForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required),
    lastDate: new FormControl('', Validators.required),
  })
  public timeslot: RoomTimespan = {
    id: null,
    room: {
      id: null,
      name: '',
      description: '',
      maxConcurrentBookings: 1,
      autoAcceptBookings: null,
    },
    start: null,
    end: null,
    type: RoomTimespanType.unknown,
    seriesId: null,
    timeSlotRecurrence: 1,
    maxStart: undefined,
    amount: 1,
  };

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public roomService: RoomService, private route: ActivatedRoute,  public activeModal: NgbActiveModal) {
    this.timeslotDeleteForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getTimeslotData();
  }

  /**
   * Deletes timeslot
   */
  public async deleteTimeslot(): Promise<void> {
    this.roomService.deleteAvailableTimeslot(this.timeslot.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Deletes timeslot series
   */
  public async deleteTimeslotSeries(): Promise<void> {
    this.roomService.deleteAvailableTimeslot(this.timeslot.seriesId).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets all data of timeslot
   */
  public async getTimeslotData(): Promise<void> {
    this.roomService.getTimeslot(this.timeslot.room.id, this.timeslot.id).subscribe({
      next: res => {
        this.timeslot = res;

        this.timeslot.start = moment(this.timeslot.start);
        this.timeslot.end = moment(this.timeslot.end);

        this.timeslotDeleteForm.controls['type'].setValue(res.type);
        this.timeslotDeleteForm.controls['room'].setValue(res.room.name);
        this.timeslotDeleteForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.timeslotDeleteForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.timeslotDeleteForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.timeslotDeleteForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
