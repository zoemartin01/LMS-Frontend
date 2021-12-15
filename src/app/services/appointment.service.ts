import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Appointment } from "../types/appointment";
import { TimespanId } from "../types/aliases/timespan-id";
import { RoomId } from "../types/aliases/room-id";
import { ConfirmationStatus } from "../types/enums/confirmation-status";

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
    if (roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointmentsForRoom
      .replace(':id', roomId)}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all data for one appointment
   *
   * @param {TimespanId} appointmentId id of the appointment
   */
  public getAppointmentData(appointmentId : TimespanId): Observable<any> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.viewAppointment
      .replace(':id', appointmentId)}`;

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
   * @param {TimespanId} appointmentId id of the appointment to be edited
   * @param {object} changedData   changed values as object
   */
  public editAppointment(appointmentId: TimespanId, changedData: object): Observable<any> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.editAppointment
      .replace(':id', appointmentId)}`;
    const requestBody = {
      appointmentId: appointmentId,
      changedData: changedData
    };

    return this.httpClient.patch(apiURL, {headers: requestBody});
  }

  /**
   * Deletes appointment
   *
   * @param {TimespanId} appointmentId Id of an appointment
   */
  public deleteAppointment(appointmentId: TimespanId): Observable<any> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.deleteAppointment
      .replace(':id', appointmentId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public acceptAppointmentRequest(appointmentId: TimespanId): Observable<any> {
    return this.editAppointment(appointmentId, { confirmationStatus: ConfirmationStatus.accepted });
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public declineAppointmentRequest(appointmentId: TimespanId): Observable<any> {
    return this.editAppointment(appointmentId, { confirmationStatus: ConfirmationStatus.denied });
  }
}
