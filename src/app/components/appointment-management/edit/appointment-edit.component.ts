import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AppointmentService} from "../../../services/appointment.service";
import {RoomService} from "../../../services/room.service";

import {Appointment} from "../../../types/appointment";
import {Room} from "../../../types/room";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {UserRole} from "../../../types/enums/user-role";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";
import * as moment from "moment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 *
 */
export class AppointmentEditComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() updateCalendar = new EventEmitter<void>();
  public appointmentEditForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    startHour: new FormControl('', Validators.required),
    endHour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlotRecurrence: new FormControl('', Validators.required),
  });
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
    confirmationStatus: ConfirmationStatus.unknown,
    timeSlotRecurrence: TimeSlotRecurrence.unknown,
    maxStart: undefined,
    amount: 1,
  };
  public rooms: Room[] = [];
  public startTimeSlots = Array.from(Array(5).keys());//@todo set dinamically
  public endTimeSlots = Array.from(Array(5).keys()).map(x => x + 8);//@todo set dinamically

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {RoomService} roomService service providing room functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public appointmentService: AppointmentService, public roomService: RoomService,  public activeModal: NgbActiveModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAppointmentData();
    this.getRooms();
  }

  /**
   * Gets all data for one appointment
   */
  public getAppointmentData(): void {
    this.appointmentService.getAppointmentData(this.appointment.id).subscribe({
      next: res => {
        this.appointment = res;

        this.appointment.start = moment(this.appointment.start);
        this.appointment.end = moment(this.appointment.end);

        this.appointmentEditForm.controls['user'].setValue(res.user.firstName + ' ' + res.user.lastName);
        this.appointmentEditForm.controls['room'].setValue(res.room.name);
        this.appointmentEditForm.controls['date'].setValue(res.start?.format('DD.MM.YYYY'));
        this.appointmentEditForm.controls['startHour'].setValue(res.start?.format('HH:mm'));
        this.appointmentEditForm.controls['endHour'].setValue(res.end?.format('HH:mm'));
        this.appointmentEditForm.controls['confirmationStatus'].setValue(res.confirmationStatus);
        this.appointmentEditForm.controls['timeSlotRecurrence'].setValue(res.timeSlotRecurrence);
        this.appointmentEditForm.controls['amount'].setValue(res.amount);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Gets all rooms
   */
  public getRooms(): void {
  }
  //todo why

  /**
   * Changes data of single appointment
   */
  public async editAppointment(): Promise<void> {
    this.appointmentService.editAppointment(this.appointment.id,
      this.getDirtyValues(this.appointmentEditForm)
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.updateCalendar.emit(); //triggers calendar update in parent component
  }

  /**
   * Changes data of single appointment
   */
  public async editAppointmentSeries(): Promise<void> {
    this.appointmentService.editAppointmentSeries(this.appointment.id,
      this.getDirtyValues(this.appointmentEditForm)
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.updateCalendar.emit(); //triggers calendar update in parent component
  }

  /**
   * Gets all values of a form that are marked with a dirty bit
   *
   * @param {FormGroup} form form
   */
  public getDirtyValues(form: FormGroup) {
    let dirtyValues: { [key: string]: any} = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if ((<FormGroup>currentControl).controls)
            dirtyValues[key] = this.getDirtyValues(<FormGroup>currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
}
