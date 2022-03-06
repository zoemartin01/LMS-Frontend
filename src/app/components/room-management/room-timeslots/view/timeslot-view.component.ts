import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { TimeslotDeleteComponent } from "../delete/timeslot-delete.component";

import { AuthService } from "../../../../services/auth.service";
import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { TimespanId } from "../../../../types/aliases/timespan-id";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";

@Component({
  selector: 'app-timeslot-view',
  templateUrl: './timeslot-view.component.html',
  styleUrls: ['./timeslot-view.component.scss']
})

export class TimeslotViewComponent implements OnInit {
  @Input() timeslotId: TimespanId = '';
  @Output() closeForm = new EventEmitter<boolean>();
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
    maxStart: null,
    amount: 1,
  };
  public timeslotViewForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required),
  });
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(
    public roomService: RoomService,
    public authService: AuthService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private route: ActivatedRoute) {
    this.timeslotViewForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getTimeslotData();
  }

  /**
   * Gets all data of timeslot
   */
  public async getTimeslotData(): Promise<void> {
    this.roomService.getTimeslot(this.timeslot.room.id, this.timeslot.id).subscribe({
      next: res => {
        this.timeslot = res;

        this.timeslotViewForm.controls['type'].setValue(res.type);
        this.timeslotViewForm.controls['room'].setValue(res.room.name);
        this.timeslotViewForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.timeslotViewForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.timeslotViewForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.timeslotViewForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.timeslotViewForm.controls['amount'].setValue(res.amount);

        this.timeslot.start = moment(this.timeslot.start);
        this.timeslot.end = moment(this.timeslot.end);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens timeslot deletion dialog
   */
  public openTimeslotDeletionDialog(): void {
    const modal = this.modalService.open(TimeslotDeleteComponent);
    modal.componentInstance.timeslot.id = this.timeslot.id;
    modal.componentInstance.timeslot.room.id = this.timeslot.room.id;
    modal.result.then((result) => {
      if (result === 'deleted') {
        this.closeForm.emit(true);
        return;
      }

      if (result !== 'aborted') {
        this.getTimeslotData();
        this.dirty = true;
      }
    });
  }
}
