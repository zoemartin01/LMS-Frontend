import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Appointment } from "../types/appointment";
import { AppointmentId } from "../types/aliases/appointment-id";
import {RoomId} from "../types/aliases/room-id";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for the management of appointments
 */
export class AppointmentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all appointments
   */
  public getAllAppointments(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.allAppointments}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all appointments for current user
   */
  public getAllAppointmentsForCurrentUser(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.myAppointments}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all appointments for specified room
   *
   * @param {RoomId} roomId id of room to retrieve appointments
   */
  public getAllAppointmentsForRoom(roomId: RoomId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.roomOverview}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all data for one appointment
   */
  public getAppointmentData(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.viewAppointment}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates a new appointment request
   *
   * @param {Appointment} appointment all data about the requested appointment
   */
  public createAppointment(appointment: Appointment): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.createAppointment}`;
    const requestBody = {
      appointment: appointment,
    };

    return this.httpClient.post(apiURL, {headers: requestBody});
  }

  /**
   * Edits an appointment
   *
   * @param {AppointmentId} appointmentId id of the appointment to be edited
   * @param {object} changedData   changed values as object
   */
  public editAppointment(appointmentId : AppointmentId, changedData: object): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.editAppointment}`;
    const requestBody = {
      appointmentId: appointmentId,
      changedData: changedData
    };

    return this.httpClient.patch(apiURL, {headers: requestBody});
  }

  /**
   * Deletes appointment
   *
   * @param {AppointmentId} appointmentId Id of an appointment
   */
  public deleteAppointment(appointmentId: number): Observable<any> {
    //TODO möglich bei room-calendar-view, admin appointment-list, appointment-view, peronal-list
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public acceptAppointmentRequest(appointmentId: AppointmentId): Observable<any> {
    //TODO möglich bei room-calendar-view, admin appointment-list
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {AppointmentId} appointmentId id of appointment
   */
  public declineAppointmentRequest(appointmentId: AppointmentId): Observable<any> {
    //TODO möglich bei room-calendar-view, admin appointment-list
  }
}
