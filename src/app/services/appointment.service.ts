import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import {ObjectUnsubscribedError, Observable} from "rxjs";
import { environment } from "../../environments/environment";

import { Appointment } from "../types/appointment";
import { TimespanId } from "../types/aliases/timespan-id";
import { RoomId } from "../types/aliases/room-id";
import { ConfirmationStatus } from "../types/enums/confirmation-status";
import {SeriesId} from "../types/aliases/series-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the management of appointments
 * @typedef {Service} AppointmentService
 * @class
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
   * Retrieves all data of the appointments for one series
   *
   * @param {SeriesId} seriesId id of the appointment
   */
  public getAllAppointmentsForSeries(seriesId : SeriesId): Observable<any> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointmentsForSeries
      .replace(':id', seriesId)}`;

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
   * Creates a new appointment request for a series of appointments
   *
   * @param {Appointment} appointment the starting appointment of the series
   * @param {number} difference milliseconds, time difference between the appointments, regularity
   * @param {number} amount 2-2048, amount of appointments wanted for the series
   */
  public createAppointmentSeries(appointment: Appointment, difference: number, amount: number) {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.createAppointmentSeries}`;
    const requestBody = {
      appointment: appointment,
      difference: difference,
      amount: amount
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
   * Edits a series of appointment
   *
   * @param {SeriesId} seriesId id of a series of appointment to be edited
   * @param {object} changedData   changed values as object
   */
  public editAppointmentSeries(seriesId: SeriesId, changedData: object): Observable<any> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.editAppointmentSeries
      .replace(':id', seriesId)}`;
    const requestBody = {
      appointmentId: seriesId,
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
   * Deletes a series of appointment
   *
   * @param {SeriesId} seriesId Id of an appointment
   */
  public deleteAppointmentSeries(seriesId: SeriesId): Observable<any> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.deleteAppointmentSeries
      .replace(':id', seriesId)}`;

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
    return this.editAppointmentSeries(appointmentId, { confirmationStatus: ConfirmationStatus.denied });
  }

  /**
   * Sets series appointment request to accepted
   *
   * @param {SeriesId} seriesId id of series of appointment
   */
  public acceptAppointmentSeriesRequest(seriesId: SeriesId): Observable<any> {
    return this.editAppointmentSeries(seriesId, { confirmationStatus: ConfirmationStatus.denied });
  }
}
