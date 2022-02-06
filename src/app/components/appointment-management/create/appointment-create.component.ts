import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import { AppointmentService } from "../../../services/appointment.service";
import * as moment from "moment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Room} from "../../../types/room";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})

/**
 * Component for the appointment create page
 *
 */
export class AppointmentCreateComponent {
  @Input() start: moment.Moment|null = null;
  @Input() room : Room = {
    id: null,
    name: '',
    description: '',
    maxConcurrentBookings: 1,
    autoAcceptBookings: null,
  };
  @Output() updateCalendar = new EventEmitter<void>();

  public appointmentCreateForm: FormGroup = new FormGroup({
    start: new FormControl('', [
      Validators.required
    ]),
    end: new FormControl('', [
      Validators.required
    ]),
    //Todo formstate
  });

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public appointmentService: AppointmentService, public activeModal: NgbActiveModal) {
  }

  /**
   * Opens appointment creation form
   *
   * @param {NgForm} appointmentCreationForm submitted creation form
   */
  public async createAppointment(appointmentCreationForm: NgForm): Promise<void> {
    if (this.appointmentCreateForm.valid) {
      const room = this.room;
      const difference = this.appointmentCreateForm.value.difference; //Todo no difference!!
      const confirmationStatus = ConfirmationStatus.pending;
      const start = this.appointmentCreateForm.value.start;
      const end = this.appointmentCreateForm.value.end;
      const amount = this.appointmentCreateForm.value.amount;
      if(this.appointmentCreateForm.value.isSeries) {
        const recurrence = TimeSlotRecurrence.unknown; //TODO
        this.appointmentService.createAppointmentSeries(room, confirmationStatus, start, end, recurrence, difference, amount).subscribe({
          next: () => {
            this.activeModal.close('created');
          }, error: error => {
            console.error('There was an error!', error);
          }
        });
      } else {
        const recurrence = TimeSlotRecurrence.unknown; //TODO
        this.appointmentService.createAppointment(room, confirmationStatus, start, end, recurrence).subscribe({
          next: () => {
            this.activeModal.close('created');
          }, error: error => {
            console.error('There was an error!', error);
          }
        });
      }
    } else {
      console.log('Invalid form data')
    }


    this.updateCalendar.emit(); //triggers calendar update in parent component
  }
}
