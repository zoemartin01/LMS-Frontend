import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss']
})
export class AdminAppointmentListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Accept appointment request, appointment gets an id, appointment request id is released
   * @param appReqId Id of an appointment request
   */
  // @ts-ignore
  public acceptAppointmentRequest(appReqId: number): Promise<void> {

  }

  /**
   * Denies appointment request, appointment request id is released
   * @param appReqId  Id of an appointment request
   */
  // @ts-ignore
  public denyAppointmentRequest(appReqId: number): Promise<void> {

  }

  /**
   * Lists all appointment requests with associated data
   */
  // @ts-ignore
  public getRequestData(): Promise<void> {

  }

  /**
   * Lists all appointments with associated data
   */
  // @ts-ignore
  public getAppointmentsData(): Promise<void> {

  }

  /**
   * Edit of the whole series of appointments
   * @param appId Id of an appointment
   * @param seriesId Id of the associated series
   */
  // @ts-ignore
  public editSeriesAppointment(appId: number, seriesId: number): Promise<void> {

  }

  /**
   * Edit a single appointment of the whole series of appointments
   * @param appId Id of an appointment
   * @param seriesId Id of the associated series
   */
  // @ts-ignore
  public editSingleSeriesAppointment(appId: number, seriesId: number): Promise<void> {

  }

  /**
   * Edit a single appointment
   * @param appId Id of an appointment
   */
  // @ts-ignore
  public editSeriesAppointment(appId: number): Promise<void> {

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
