import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.scss']
})
export class AppointmentCreationComponent implements OnInit {

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
}
