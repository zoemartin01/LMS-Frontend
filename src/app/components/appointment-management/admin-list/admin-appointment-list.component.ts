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
import { AppointmentAcceptComponent } from "../accept/appointment-accept.component";
import { AppointmentDeclineComponent } from "../decline/appointment-decline.component";

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss'],
})

/**
 * Component for the admin appointment list page, to view all appointments and all requested appointments
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
   * @param {number} page current number of page
   */
  public async getPendingAppointments(page: number = this.pendingAppointments.page): Promise<void> {
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
   *
   * @param {number} page current number of page
   */
  public async getAcceptedAppointments(page: number = this.acceptedAppointments.page) : Promise<void> {
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
   * Opens appointment creation form
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
   * Gets appointment data of all denied appointments
   *
   * @param {number} page current number of page
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
   * Opens appointment accept confirmation dialog
   *
   * @param {TimespanId} timespanId id of pending appointment request
   */
  public openAppointmentAcceptDialog(timespanId: TimespanId): void {
    const modal = this.modalService.open(AppointmentAcceptComponent);
    modal.componentInstance.appointment.id = timespanId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointments();
      }
    });
  }

  /**
   * Opens appointment decline confirmation dialog
   *
   * @param {TimespanId} timespanId id of pending appointment request
   */
  public async openAppointmentDeclineDialog(timespanId: TimespanId): Promise<void> {
    const modal = this.modalService.open(AppointmentDeclineComponent);
    modal.componentInstance.appointment.id = timespanId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointments();
      }
    });
  }
}
