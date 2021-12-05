import { Component, OnInit } from '@angular/core';
import {AppointmentId} from "../../../types/aliases/appointment-id";

@Component({
  selector: 'app-room-calender-view',
  templateUrl: './room-calender-view.component.html',
  styleUrls: ['./room-calender-view.component.scss']
})
export class RoomCalenderViewComponent implements OnInit {

  constructor() { }

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
}
