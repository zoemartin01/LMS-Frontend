import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-calender-view',
  templateUrl: './room-calender-view.component.html',
  styleUrls: ['./room-calender-view.component.scss']
})
export class RoomCalenderViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Creates an appointment request
   * @param roomId associated room
   * @param userId associated user
   * @param startTime beginning of appointment
   * @param endTime end of appointment
   */
  // @ts-ignore
  public createRequest(roomId: number, userId: number, startTime: string, endTime: stirng): Promise<void> {

  }
  //TODO also in appointment creation

  /**
   * Gets appointment data of all appointments of one room
   * @param roomId associated room
   */
  // @ts-ignore
  public getAppointmentData(roomId: number): Promise<void> {

  }
}
