import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

import { AppointmentDeleteComponent } from "../delete/appointment-delete.component";
import { AppointmentEditComponent } from "../edit/appointment-edit.component";

import { AppointmentService } from "../../../services/appointment.service";
import { AuthService } from "../../../services/auth.service";

import { Appointment } from "../../../types/appointment";
import { ConfirmationStatus } from "../../../types/enums/confirmation-status";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { RoomTimespanType } from "../../../types/enums/timespan-type";
import { UserRole } from "../../../types/enums/user-role";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})

/**
 * Component for the appointment view page
 *
 *
 */
export class AppointmentViewComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() close = new EventEmitter<boolean>();
  public appointment: Appointment = {
    id: null,
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    },
    room: {
      id: null,
      name: '',
      description: '',
      maxConcurrentBookings: 1,
      autoAcceptBookings: null,
    },
    start: null,
    end: null,
    type: RoomTimespanType.appointment,
    seriesId: null,
    timeSlotRecurrence: 1,
    maxStart: undefined,
    amount: 1,
    confirmationStatus: ConfirmationStatus.unknown,
  };
  public appointmentViewForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    confirmationStatus: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
  });
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(
    public appointmentService: AppointmentService,
    public authService: AuthService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private route: ActivatedRoute) {
    this.appointmentViewForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getAppointmentData();
    });
  }

  /**
   * Gets all data of appointment
   */
  public async getAppointmentData(): Promise<void> {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        this.appointmentViewForm.controls['user'].setValue(res.user.firstName + ' ' + res.user.lastName);
        this.appointmentViewForm.controls['room'].setValue(res.room.name);
        this.appointmentViewForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentViewForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.appointmentViewForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.appointmentViewForm.controls['confirmationStatus'].setValue(res.confirmationStatus);
        this.appointmentViewForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens appointment edit form
   */
  public openAppointmentEditForm(): void {
    const modal = this.modalService.open(AppointmentEditComponent);
    modal.componentInstance.appointment.id = this.appointment.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getAppointmentData();
      }
    });

    this.close.emit(true);
  }

  /**
   * Opens appointment deletion dialog
   */
  public openAppointmentDeletionDialog(): void {
    const modal = this.modalService.open(AppointmentDeleteComponent);
    modal.componentInstance.appointment.id = this.appointment.id;
    modal.result.then((result) => {
      if (result === 'deleted') {
        this.activeModal.close('dirty');
        return;
      }

      if (result !== 'aborted') {
        this.getAppointmentData();
        this.dirty = true;
      }
    });
    this.close.emit(true);
  }
}
