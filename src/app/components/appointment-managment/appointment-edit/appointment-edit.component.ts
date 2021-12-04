import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * lists information about all the data of an appointment
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

}
