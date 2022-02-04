import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "../../../services/auth.service";
import { AppointmentService } from "../../../services/appointment.service";

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { PagedList } from 'src/app/types/paged-list';

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
  public appointments: PagedList<Appointment> = new PagedList<Appointment>();

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   */
  constructor(public appointmentService: AppointmentService, public authService: AuthService) {
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
  public async getAllAppointmentsForCurrentUser(page: number = this.appointments.page): Promise<void> {
    const pageSize = this.appointments.pageSize;
    const offset = (page - 1) * pageSize;

    this.appointmentService.getAllAppointmentsForCurrentUser(pageSize, offset).subscribe({
      next: res => {
        this.appointments.parse(
          res,
          page,
          (appointment: Appointment) => {
            appointment.start = moment(appointment.start);
            appointment.end = moment(appointment.end);
            return appointment;
          }
        )
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
  }

  /**
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
  }

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {
  }
}
