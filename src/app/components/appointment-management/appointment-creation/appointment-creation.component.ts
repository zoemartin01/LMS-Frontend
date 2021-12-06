import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.scss']
})
export class AppointmentCreationComponent implements OnInit {

  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Opens appointment creation form
   *
   * @param appointmentCreationForm submitted creation form
   */
  public async createAppointment(appointmentCreationForm: NgForm): Promise<void> {
  }
}
