import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Appointment } from "../types/appointment";
import { AppointmentId } from "../types/aliases/appointment-id";
import {RoomId} from "../types/aliases/room-id";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all appointments
   */
  public getAllAppoinments(): Observable<any> {
  }

  /**
   * Retrieves all appointments for current user
   */
  public getAllAppoinmentsForCurrentUser(): Observable<any> {
  }

  /**
   * Retrieves all appointments for specified room
   *
   * @param roomId id of room to retrieve appointments
   */
  public getAllAppoinmentsForRoom(roomId: RoomId): Observable<any> {
  }

  /**
   * Retrieves all data for one appointment
   */
  public getAppoinmentData(): Observable<any> {
  }

  /**
   * Creates a new appointment request
   *
   * @param appointment all data about the requested appointment
   */
  public createAppointment(appointment: Appointment): Observable<any> {
  }

  /**
   * Edits an appointment
   *
   * @param appointmentId id of the appointment to be edited
   * @param changedData   changed values as object
   */
  public editAppointment(appointmentId : AppointmentId, changedData: object): Observable<any> {
  }

  /**
   * Deletes appointment
   *
   * @param appointmentId Id of an appointment
   */
  public deleteAppointment(appointmentId: number): Observable<any> {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param appointmentId id of appointment
   */
  public async acceptAppointmentRequest(appointmentId: AppointmentId): Observable<any> {
  }

  /**
   * Sets appointment request to accepted
   *
   * @param appointmentId id of appointment
   */
  public async declineAppointmentRequest(appointmentId: AppointmentId): Observable<any> {
  }
}
