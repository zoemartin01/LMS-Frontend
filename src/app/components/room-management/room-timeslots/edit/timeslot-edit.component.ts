import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { RoomService } from "../../../../services/room.service";

import { RoomTimespan } from "../../../../types/room-timespan";
import { TimespanId } from "../../../../types/aliases/timespan-id";
import { RoomTimespanType } from "../../../../types/enums/timespan-type";
import { TimeSlotRecurrence } from "../../../../types/enums/timeslot-recurrence";
import {RoomId} from "../../../../types/aliases/room-id";

@Component({
  selector: 'app-timeslot-edit',
  templateUrl: './timeslot-edit.component.html',
  styleUrls: ['./timeslot-edit.component.scss']
})

/**
 * Component for the timeslot edit page
 */
export class TimeslotEditComponent implements OnInit {
  @Input() roomId: RoomId = '';
  @Input() timeslotId: TimespanId = '';
  @Output() closeForm = new EventEmitter<boolean>();
  public timeslotEditForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
  });
  public recurringTimeslotEditForm: FormGroup = new FormGroup({
    timeSlotRecurrence: new FormControl(''),
    amount: new FormControl(''),
  });
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
  public date: moment.Moment = moment();
  public dateText: string = '';
  public dateField: NgbDateStruct = new class implements NgbDateStruct {
    day = 1;
    month = 1;
    year = 1990;
  };
  public isRecurring: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {RoomService} roomService service providing room functionalities
   */
  constructor(
    public roomService: RoomService,
  ) {
    this.timeslotEditForm.controls['type'].disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.timeslot.id = this.timeslotId;
    this.timeslot.room.id = this.roomId;
    this.getTimeslot();
  }

  /**
   * Gets all data for one timeslot
   */
  public getTimeslot(): void {
    this.roomService.getTimeslot(this.timeslot.room.id, this.timeslot.id).subscribe({
      next: res => {
        this.timeslot = res;

        this.timeslot.start = moment(this.timeslot.start);
        this.timeslot.end = moment(this.timeslot.end)

        this.setDate(this.timeslot.start);
        this.timeslot = res;

        this.timeslot.start = moment(this.timeslot.start);
        this.timeslot.end = moment(this.timeslot.end);

        this.timeslotEditForm.controls['type'].setValue(this.timeslot.type);
        this.timeslotEditForm.controls['startHour'].setValue(this.timeslot.start.format('HH'));
        this.timeslotEditForm.controls['endHour'].setValue(this.timeslot.end.format('HH'));
        this.recurringTimeslotEditForm.controls['timeSlotRecurrence'].setValue(this.timeslot.timeSlotRecurrence);
        this.recurringTimeslotEditForm.controls['amount'].setValue(this.timeslot.amount);

        this.isRecurring = this.timeslot.timeSlotRecurrence !== TimeSlotRecurrence.single;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Sets current date
   *
   * @param {moment.Moment} date date
   */
  public setDate(date: moment.Moment): void {
    this.date = date;

    this.dateText = this.date.format("DD.MM.YYYY");

    this.dateField.day = +this.date.format("D");
    this.dateField.month = +this.date.format("M");
    this.dateField.year = +this.date.format("YYYY");
  }

  /**
   * Handles change of datepicker
   */
  public handleDatepickerChange(): void {
    this.setDate(moment(`${this.dateField.year}-${this.dateField.month}-${this.dateField.day}`));
  }

  /**
   * Changes data of single timeslot
   */
  public async editTimeslot(): Promise<void> {
    let changedData: { [key: string]: any} = {};

    if (this.date !== this.timeslot.start || this.timeslotEditForm.controls['startHour'].dirty
      || this.timeslotEditForm.controls['endHour'].dirty) {
      const day = moment(this.date).minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.timeslotEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      changedData['end'] = day.hours(moment(this.timeslotEditForm.controls['endHour'].value, 'HH:mm')
        .hours()).toISOString();
    }

    this.roomService.editTimeslot(this.timeslot.room.id, this.timeslot.id, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Changes data of single timeslot
   */
  public async editTimeslotSeries(): Promise<void> {
    let changedData: { [key: string]: any} =  this.getDirtyValues(this.recurringTimeslotEditForm);

    if (this.date !== this.timeslot.start || this.timeslotEditForm.controls['startHour'].dirty
      || this.timeslotEditForm.controls['endHour'].dirty) {
      const day = moment(this.date).minutes(0).seconds(0);

      changedData['start'] = day.hours(moment(this.timeslotEditForm.controls['startHour'].value, 'HH:mm')
        .hours()).toISOString();
      changedData['end'] = day.hours(moment(this.timeslotEditForm.controls['endHour'].value, 'HH:mm')
        .hours()).toISOString();
    }

    this.roomService.editTimeslotSeries(this.timeslot.room.id, this.timeslot.seriesId, changedData).subscribe({
      next: () => {
        this.closeForm.emit(true);
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
