import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {AppointmentService} from "../../../services/appointment.service";
import {RoomService} from "../../../services/room.service";

import {Appointment} from "../../../types/appointment";
import {Room} from "../../../types/room";
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {RoomTimespanType} from "../../../types/enums/timespan-type";
import {UserRole} from "../../../types/enums/user-role";
import {TimeSlotRecurrence} from "../../../types/enums/timeslot-recurrence";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})

/**
 * Component for the appointment edit page
 *
 *
 */
export class AppointmentEditComponent implements OnInit {
  @Input() appointmentId: string = '';
  @Output() updateCalendar = new EventEmitter<void>();
  public appointmentEditForm: FormGroup = new FormGroup({

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
    timeSlotRecurrence: TimeSlotRecurrence.unknown
  };
  public rooms: Room[] = [];
  public startTimeSlots = Array.from(Array(5).keys());//@todo set dinamically
  public endTimeSlots = Array.from(Array(5).keys()).map(x => x + 8);//@todo set dinamically

  /**
   * Constructor
   * @constructor
   * @param {AppointmentService} appointmentService service providing appointment functionalities
   * @param {RoomService} roomService service providing room functionalities
   */
  constructor(public appointmentService: AppointmentService, public roomService: RoomService) {
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
  }

  /**
   * Gets all rooms
   */
  public getRooms(): void {
  }

  /**
   * Changes data of appointment
   */
  public async editAppointment(): Promise<void> {

    this.updateCalendar.emit(); //triggers calendar update in parent component
  }
}
