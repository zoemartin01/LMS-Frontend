import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-appointment-list',
  templateUrl: './personal-appointment-list.component.html',
  styleUrls: ['./personal-appointment-list.component.scss']
})
export class PersonalAppointmentListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Lists all appointments with associated data
   */
  // @ts-ignore
  public getAppointmentsData(): Promise<void> {

  }

  /**
   * Cancel the whole series of appointments
   * @param appId Id of an appointment
   * @param seriesId Id of the associated series
   */
  // @ts-ignore
  public cancelSeriesAppointment(appId: number, seriesId: number): Promise<void> {

  }

  /**
   * Cancel a single appointment of the whole series of appointments
   * @param appId Id of an appointment
   * @param seriesId Id of the associated series
   */
  // @ts-ignore
  public cancelSingleSeriesAppointment(appId: number, seriesId: number): Promise<void> {

  }

  /**
   * Cancel a single appointment
   * @param appId Id of an appointment
   */
  // @ts-ignore
  public cancelSingleAppointment(appId: number): Promise<void> {

  }
}
