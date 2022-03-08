import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentService } from "../../../services/appointment.service";
import { UtilityService } from "../../../services/utility.service";

import { Room } from "../../../types/room";

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})

/**
 * Component for the appointment create page
 */
export class AppointmentCreateComponent implements OnInit {
  @Input() start: moment.Moment|null = null;
  @Input() room : Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  @Output() closeForm = new EventEmitter<boolean>();
  public appointmentCreateForm: FormGroup = new FormGroup({
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    safetyInstructions: new FormControl(false, Validators.requiredTrue),
    hwlabRules: new FormControl(false, Validators.requiredTrue),
  });
  public recurringAppointmentCreateForm: FormGroup = new FormGroup({
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required),
  });
  public date: moment.Moment = moment();
  public dateText: string = '';
  public dateField: NgbDateStruct = new class implements NgbDateStruct {
    day = 1;
    month = 1;
    year = 1990;
  };
  public isRecurring: boolean = false;
  public seriesConflict = false;
  public force = false;
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   */
  constructor(
    public appointmentService: AppointmentService,
    public utilityService: UtilityService,
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.setDate(this.start ?? moment());

    const endHour: number = +moment(this.date).add(1, 'hours').format('HH');

    this.appointmentCreateForm.controls['startHour'].setValue(this.date.format('HH'));
    this.appointmentCreateForm.controls['endHour'].setValue(endHour === 0 ? 24 : endHour);
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
   * Opens appointment creation form
   */
  public async createAppointment(): Promise<void> {
    this.errorMessage = '';
    if (!this.appointmentCreateForm.valid || (this.isRecurring && !this.recurringAppointmentCreateForm.valid)) {
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }

    const day = moment(this.date).minutes(0).seconds(0);
    const endHour = +this.appointmentCreateForm.controls['endHour'].value;

    if (!this.isRecurring) {
      this.appointmentService.createAppointment(
        this.room,
        moment(day).hours(moment(this.appointmentCreateForm.controls['startHour'].value, 'HH:mm').hours()),
        endHour === 24
          ? moment(day).add(1, 'day').hours(0)
          : moment(day).hours(moment(endHour, 'HH:mm').hours()),
      ).subscribe({
        next: () => {
          this.closeForm.emit(true);
        },
        error: error => {
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      });
    } else {
      this.seriesConflict = false;

      this.appointmentService.createAppointmentSeries(
        this.room,
        moment(day).hours(moment(this.appointmentCreateForm.controls['startHour'].value, 'HH:mm').hours()),
        endHour === 24
          ? moment(day).add(1, 'day').hours(0)
          : moment(day).hours(moment(endHour, 'HH:mm').hours()),
        +this.recurringAppointmentCreateForm.value.timeSlotRecurrence,
        +this.recurringAppointmentCreateForm.value.amount,
        this.force
      ).subscribe({
        next: () => {
          this.closeForm.emit(true);
        },
        error: error => {
          if (error.status === 409) {
            this.seriesConflict = true;
          }

          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      });
    }
  }
}
