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
  @Output() close = new EventEmitter<boolean>();

  public appointmentCreateForm: FormGroup = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
    amount: new FormControl(1, Validators.required)
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
      const room = this.room; //todo woher kommt der raum
      const start = this.appointmentCreateForm.value.start;
      const end = this.appointmentCreateForm.value.end;
      const recurrence = this.appointmentCreateForm.value.timeSlotRecurrence;
      const confirmationStatus = ConfirmationStatus.pending;
      if(recurrence !== TimeSlotRecurrence.single) {
        const amount = this.appointmentCreateForm.value.amount;
        //Todo test amount !== 1 && recurrence === single -> fehler
        this.appointmentService.createAppointmentSeries(room, confirmationStatus, start, end, recurrence, amount).subscribe({
          next: () => {
            this.activeModal.close('created');
          }, error: error => {
            console.error('There was an error!', error);
          }
        });
      } else {
        this.appointmentService.createAppointment(room, confirmationStatus, start, end).subscribe({
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
    this.close.emit(true);
  }
}
