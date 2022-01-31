import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "../../../services/auth.service";
import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import {AppointmentViewComponent} from "../view/appointment-view.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentDeleteComponent} from "../delete/appointment-delete.component";
import {AppointmentCreateComponent} from "../create/appointment-create.component";

@Component({
  selector: 'app-personal-appointment-list',
  templateUrl: './personal-appointment-list.component.html',
  styleUrls: ['./personal-appointment-list.component.scss']
})

/**
 * Component for the personal appointments list page
 *
 *
 */
export class PersonalAppointmentListComponent implements OnInit {
  public appointments: Appointment[] = [];

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public appointmentService: AppointmentService, public authService: AuthService, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAllAppointmentsForCurrentUser();
  }

  /**
   * Gets appointment data of all appointments for current user
   */
  public async getAllAppointmentsForCurrentUser(): Promise<void> {
    this.appointmentService.getAllAppointmentsForCurrentUser().subscribe({
      next: res => {
        this.appointments = res.map((appointment: Appointment) => {
          appointment.start = moment(appointment.start);
          appointment.end = moment(appointment.end);
          return appointment;
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {
    const modal = this.modalService.open(AppointmentCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAllAppointmentsForCurrentUser();
      }
    });
  }

  /**
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
    const modal = this.modalService.open(AppointmentViewComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAllAppointmentsForCurrentUser();
      }
    });
  }

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {
    const modal = this.modalService.open(AppointmentDeleteComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAllAppointmentsForCurrentUser();
      }
    });
  }
}
