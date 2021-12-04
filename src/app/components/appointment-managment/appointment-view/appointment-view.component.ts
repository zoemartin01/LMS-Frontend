import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Lists all appointments with associated data
   */
  // @ts-ignore
  public getAppointmentData(): Promise<void> {

  }

  /**
   * Edits an appointment
   * @param roomId associated room
   * @param userId associated user
   * @param startTime beginning of appointment
   * @param endTime end of appointment
   * @param appId appointment id
   * @param seriesId associated series of appointment
   */
  // @ts-ignore
  public editAppointmentData(roomId: number, userId: number, startTime: string, endTime: string, appId: number, seriesId: number): Promise<void> {

  }
  //TODO also in edit
}
