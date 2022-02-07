import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

import { Appointment } from '../../../types/appointment';
import { TimespanId } from '../../../types/aliases/timespan-id';
import { ConfirmationStatus } from '../../../types/enums/confirmation-status';
import { PagedList } from 'src/app/types/paged-list';

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss'],
})

/**
 * Component for the admin appointment list page, to view all appointments and all requested appointments
 *
 *
 */
export class AdminAppointmentListComponent implements OnInit {
  public pendingAppointments: PagedList<Appointment> =
    new PagedList<Appointment>();
  public acceptedAppointments: PagedList<Appointment> =
    new PagedList<Appointment>();
  public deniedAppointments: PagedList<Appointment> =
    new PagedList<Appointment>();

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {UserService} userService service providing user functionalities
   */
  constructor(
    public appointmentService: AppointmentService,
    public authService: AuthService,
    public userService: UserService
  ) {}

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAppointments();
  }

  /**
   * Gets appointment data of all appointments
   */
  public async getAppointments(): Promise<void> {
    await this.getPendingAppointments();
    await this.getAcceptedAppointments();
    await this.getDeniedAppointments();
  }

  /**
   * Gets appointment data of all pending appointments
   */
  public async getPendingAppointments(
    page: number = this.pendingAppointments.page
  ): Promise<void> {
    const pageSize = this.pendingAppointments.pageSize;
    const offset = (page - 1) * pageSize;

    this.appointmentService
      .getAllAppointments(pageSize, offset, ConfirmationStatus.pending)
      .subscribe({
        next: (res) => {
          this.pendingAppointments.parse(
            res,
            page,
            (appointment: Appointment) => {
              appointment.start = moment(appointment.start);
              appointment.end = moment(appointment.end);
              return appointment;
            }
          );
          console.log(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Gets appointment data of all accepted appointments
   */
  public async getAcceptedAppointments(
    page: number = this.acceptedAppointments.page
  ) : Promise<void> {
    const pageSize = this.acceptedAppointments.pageSize;
    const offset = (page - 1) * pageSize;
    
    this.appointmentService
      .getAllAppointments(pageSize, offset, ConfirmationStatus.accepted)
      .subscribe({
        next: (res) => {
          this.acceptedAppointments.parse(
            res,
            page,
            (appointment: Appointment) => {
              appointment.start = moment(appointment.start);
              appointment.end = moment(appointment.end);
              return appointment;
            }
          );
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Gets appointment data of all denied appointments
   */
  public async getDeniedAppointments(
    page: number = this.deniedAppointments.page
  ) : Promise<void> {
    const pageSize = this.deniedAppointments.pageSize;
    const offset = (page - 1) * pageSize;
    
    this.appointmentService
      .getAllAppointments(pageSize, offset, ConfirmationStatus.denied)
      .subscribe({
        next: (res) => {
          this.deniedAppointments.parse(
            res,
            page,
            (appointment: Appointment) => {
              appointment.start = moment(appointment.start);
              appointment.end = moment(appointment.end);
              return appointment;
            }
          );
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Opens appointment creation form
   */
  public openAppointmentCreationForm(): void {}

  /**
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {}

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {}

  /**
   * Opens appointment deletion dialog
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentDeletionDialog(appointmentId: TimespanId): void {}

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   * @param {boolean} isSeries is an appointment series
   */
  public async acceptAppointmentRequest(
    appointmentId: TimespanId,
    isSeries: boolean
  ): Promise<void> {
    isSeries
      ? this.appointmentService
          .acceptAppointmentSeriesRequest(appointmentId)
          .subscribe({
            next: () => {
              this.getAppointments();
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          })
      : this.appointmentService
          .acceptAppointmentRequest(appointmentId)
          .subscribe({
            next: () => {
              this.getAppointments();
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
  }

  /**
   * Sets appointment request to declined
   *
   * @param {TimespanId} appointmentId id of appointment
   * @param {boolean} isSeries is an appointment series
   */
  public async declineAppointmentRequest(
    appointmentId: TimespanId,
    isSeries: boolean
  ): Promise<void> {
    console.log(isSeries);
    isSeries
      ? this.appointmentService
          .declineAppointmentSeriesRequest(appointmentId)
          .subscribe({
            next: () => {
              this.getAppointments();
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          })
      : this.appointmentService
          .declineAppointmentRequest(appointmentId)
          .subscribe({
            next: () => {
              this.getAppointments();
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
  }
}
