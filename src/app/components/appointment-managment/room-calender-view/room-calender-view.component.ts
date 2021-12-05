import { Component, OnInit } from '@angular/core';
import {AppointmentId} from "../../../types/aliases/appointment-id";
import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-room-calender-view',
  templateUrl: './room-calender-view.component.html',
  styleUrls: ['./room-calender-view.component.scss']
})
export class RoomCalenderViewComponent implements OnInit {

  constructor(public appointmentService: AppointmentService) { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }


  /**
   * Opens appointment creation form
   */
  public openCreationForm(): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param appointmentId id of appointment
   */
  public editAppointment(appointmentId: AppointmentId): Promise<void> {
  }

  /**
   * Gets appointment data of all appointments of one room
   * @param roomId associated room
   */
  public getAppointmentData(roomId: number): Promise<void> {

  }

  /**
   * Opens appointment cancel popup
   *
   * @param appointmentId id of appointment
   */
  public cancelAppointment(appointmentId: AppointmentId): Promise<void> {
  }
}
