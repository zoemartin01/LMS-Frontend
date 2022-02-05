import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

import { AppointmentCreateComponent } from "../create/appointment-create.component";
import { AppointmentDeleteComponent } from "../delete/appointment-delete.component";
import { AppointmentEditComponent } from "../edit/appointment-edit.component";
import { AppointmentViewComponent } from "../view/appointment-view.component";

import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

import { Appointment } from "../../../types/appointment";
import { TimespanId } from "../../../types/aliases/timespan-id";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
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
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public appointmentService: AppointmentService,
    public authService: AuthService,
    public userService: UserService, private modalService: NgbModal) {
  }

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
              if (appointment.maxStart !== null) appointment.maxStart = moment(appointment.maxStart)
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
              if (appointment.maxStart !== null) appointment.maxStart = moment(appointment.maxStart)
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
  public openAppointmentCreationForm(): void {
    const modal = this.modalService.open(AppointmentCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointments();
      }
    });
  }

  /**
   * @todo Sarah JSDoc
   * @param page
   */
  public async getDeniedAppointments(page: number = this.deniedAppointments.page) : Promise<void> {
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
              if (appointment.maxStart !== null) appointment.maxStart = moment(appointment.maxStart)
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
   * Opens appointment view
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentView(appointmentId: TimespanId): void {
    const modal = this.modalService.open(AppointmentViewComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointments();
      }
    });
  }

  /**
   * Opens appointment edit form
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public openAppointmentEditForm(appointmentId: TimespanId): void {
    const modal = this.modalService.open(AppointmentEditComponent);
    modal.componentInstance.appointment.id = appointmentId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointments();
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
        this.getAppointments();
      }
    });
  }

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
