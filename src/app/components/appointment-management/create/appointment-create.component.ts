import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from "@angular/forms";

import { AppointmentService } from "../../../services/appointment.service";
import * as moment from "moment";

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})

/**
 * Component for the appointment create page
 *
 *
 */
export class AppointmentCreateComponent {
  @Input() start: moment.Moment|null = null;
  @Output() updateCalendar = new EventEmitter<void>();

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   */
  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Opens appointment creation form
   *
   * @param {NgForm} appointmentCreationForm submitted creation form
   */
  public async createAppointment(appointmentCreationForm: NgForm): Promise<void> {

    this.updateCalendar.emit(); //triggers calendar update in parent component
  }
}
