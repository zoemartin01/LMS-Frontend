import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { RoomService } from "../../../../services/room.service";

import { Room } from "../../../../types/room";

@Component({
  selector: 'app-timeslot-create',
  templateUrl: './timeslot-create.component.html',
  styleUrls: ['./timeslot-create.component.scss']
})

/**
 * Component for the timeslot create page
 */
export class TimeslotCreateComponent implements OnInit {
  @Input() start: moment.Moment|null = null;
  @Input() room : Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  @Output() closeForm = new EventEmitter<boolean>();
  public timeslotCreateForm: FormGroup = new FormGroup({
    type: new FormControl(2),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
  });
  public recurringTimeslotCreateForm: FormGroup = new FormGroup({
    timeSlotRecurrence: new FormControl(''),
    amount: new FormControl(1),
  });
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
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.setDate(this.start ?? moment());
    this.timeslotCreateForm.controls['startHour'].setValue(this.date.format('HH'));
    this.timeslotCreateForm.controls['endHour'].setValue(moment(this.date).add(1, 'hours').format('HH'));
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
   * Opens timeslot creation form
   */
  public async createTimeslot(): Promise<void> {
    if (this.timeslotCreateForm.valid) {
      const day = moment(this.date).minutes(0).seconds(0);

      if (!this.isRecurring) {
        this.roomService.createTimeslot(
          this.room,
          moment(day).hours(moment(this.timeslotCreateForm.controls['startHour'].value, 'HH:mm').hours()),
          moment(day).hours(moment(this.timeslotCreateForm.controls['endHour'].value, 'HH:mm').hours()),
          +this.timeslotCreateForm.controls['type'].value
        ).subscribe({
          next: () => {
            this.closeForm.emit(true);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      } else {
        this.roomService.createTimeslotSeries(
          this.room,
          moment(day).hours(moment(this.timeslotCreateForm.controls['startHour'].value, 'HH:mm').hours()),
          moment(day).hours(moment(this.timeslotCreateForm.controls['endHour'].value, 'HH:mm').hours()),
          +this.timeslotCreateForm.controls['type'].value,
          +this.recurringTimeslotCreateForm.controls['timeSlotRecurrence'].value,
          +this.recurringTimeslotCreateForm.controls['amount'].value
        ).subscribe({
          next: () => {
            this.closeForm.emit(true);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }
    } else {
      console.error('Invalid form data')
    }
  }
}

