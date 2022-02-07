import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Appointment } from "../types/appointment";
import { TimespanId } from "../types/aliases/timespan-id";
import { Room } from "../types/room";
import { RoomId } from "../types/aliases/room-id";
import { ConfirmationStatus } from "../types/enums/confirmation-status";
import { SeriesId } from "../types/aliases/series-id";
import { PagedResponse } from '../types/paged-response';
import { TimeSlotRecurrence } from "../types/enums/timeslot-recurrence";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the management of appointments
 * @typedef {Service} AppointmentService
 * @class
 */
export class AppointmentService {
  /**
   * constructor
   *
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all appointments
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   * @param {ConfirmationStatus} confirmationStatus confirmation status of appointments
   */
  public getAllAppointments(limit: number = 0, offset: number = 0, confirmationStatus: ConfirmationStatus|undefined = undefined): Observable<PagedResponse<Appointment>> {
    let apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.getAllAppointments}` +
    `?limit=${limit}&offset=${offset}`;

    if (confirmationStatus !== undefined) {
      apiURL += `&confirmationStatus=${confirmationStatus}`;
    }

    return this.httpClient.get<PagedResponse<Appointment>>(apiURL);
  }

  /**
   * Retrieves all appointments for current user
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllAppointmentsForCurrentUser(limit: number = 0, offset: number = 0,): Observable<PagedResponse<Appointment>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.getCurrentUserAppointments}` +
    `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Appointment>>(apiURL);
  }

  /**
   * Retrieves all appointments for specified room
   *
   * @param {RoomId} roomId id of room to retrieve appointments
   * @param limit maximum of loaded entities per request
   * @param offset start of loaded entities per request
   */
  public getAllAppointmentsForRoom(roomId: RoomId, limit: number = 0, offset: number = 0): Observable<PagedResponse<Appointment>> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.getRoomAppointments
      .replace(':id', roomId)}?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Appointment>>(apiURL);
  }

  /**
   * Retrieves all data for one appointment
   *
   * @param {TimespanId} appointmentId id of the appointment
   */
  public getAppointmentData(appointmentId : TimespanId): Observable<Appointment> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.getSingleAppointment
      .replace(':id', appointmentId)}`;

    return this.httpClient.get<Appointment>(apiURL);
  }

  /**
   * Retrieves all data of the appointments for one series
   *
   * @param {SeriesId} seriesId id of the appointment series
   * @param limit maximum of loaded entities per request
   * @param offset start of loaded entities per request
   */
  public getAllAppointmentsForSeries(seriesId : SeriesId, limit: number = 0, offset: number = 0): Observable<PagedResponse<Appointment>> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.getSeriesAppointments
      .replace(':id', seriesId)}?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Appointment>>(apiURL);
  }

  /**
   * Creates a new appointment request
   *
   * @param room room of the appointment to take place in
   * @param start start of the appointment
   * @param end end of the appointment
   */
  public createAppointment(room : Room, start: moment.Moment, end: moment.Moment): Observable<Appointment> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.createAppointment}`;
    const requestBody = {
      roomId: room.id,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    return this.httpClient.post<Appointment>(apiURL, requestBody);
  }

  /**
   * Creates a new appointment request for a series of appointments
   *
   * @param room room of the appointment to take place in
   * @param start start of the appointment
   * @param end end of the appointment
   * @param timeSlotRecurrence recurrence of the appointment
   * @param {number} amount 2-2048, amount of appointments wanted for the series
   * @param {boolean} force if true no warning is returned on conflict, appointments with conflicts are not created
   */
  public createAppointmentSeries(
      room: Room,
      start: moment.Moment,
      end: moment.Moment,
      timeSlotRecurrence: TimeSlotRecurrence,
      amount: number,
      force: boolean
    ): Observable<Appointment[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.createAppointmentSeries}`;
    const requestBody = {
      roomId: room.id,
      start: start.toISOString(),
      end: end.toISOString(),
      timeSlotRecurrence,
      amount,
      force,
    };

    return this.httpClient.post<Appointment[]>(apiURL, requestBody);
  }

  /**
   * Edits an appointment
   *
   * @param {TimespanId} appointmentId id of the appointment to be edited
   * @param {object} changedData   changed values as object
   */
  public editAppointment(appointmentId: TimespanId, changedData: object): Observable<Appointment> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.updateAppointment
      .replace(':id', appointmentId)}`;

    return this.httpClient.patch<Appointment>(apiURL, changedData);
  }

  /**
   * Edits a series of appointment
   *
   * @param {SeriesId} seriesId id of a series of appointment to be edited
   * @param {object} changedData   changed values as object
   */
  public editAppointmentSeries(seriesId: SeriesId, changedData: object): Observable<Appointment[]> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.updateAppointmentSeries
      .replace(':id', seriesId)}`;

    return this.httpClient.patch<Appointment[]>(apiURL, changedData);
  }

  /**
   * Deletes appointment
   *
   * @param {TimespanId} appointmentId Id of an appointment
   */
  public deleteAppointment(appointmentId: TimespanId): Observable<void> {
    if (appointmentId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.deleteAppointment
      .replace(':id', appointmentId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Deletes a series of appointment
   *
   * @param {SeriesId} seriesId Id of an appointment
   */
  public deleteAppointmentSeries(seriesId: SeriesId): Observable<void> {
    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.appointments.deleteAppointmentSeries
      .replace(':id', seriesId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Sets appointment request to accepted
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public acceptAppointmentRequest(appointmentId: TimespanId): Observable<Appointment> {
    return this.editAppointment(appointmentId, { confirmationStatus: ConfirmationStatus.accepted });
  }

  /**
   * Sets appointment request to declined
   *
   * @param {TimespanId} appointmentId id of appointment
   */
  public declineAppointmentRequest(appointmentId: TimespanId): Observable<Appointment> {
    return this.editAppointment(appointmentId, { confirmationStatus: ConfirmationStatus.denied });
  }

  /**
   * Sets series appointments request to accepted
   *
   * @param {SeriesId} seriesId id of series of appointments
   */
  public acceptAppointmentSeriesRequest(seriesId: SeriesId): Observable<Appointment[]> {
    return this.editAppointmentSeries(seriesId, { confirmationStatus: ConfirmationStatus.accepted });
  }

  /**
   * Sets series of appointments request to declined
   *
   * @param {SeriesId} seriesId id of series of appointments
   */
  public declineAppointmentSeriesRequest(seriesId: SeriesId): Observable<Appointment[]> {
    return this.editAppointmentSeries(seriesId, { confirmationStatus: ConfirmationStatus.denied });
  }
}
