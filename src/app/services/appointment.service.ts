import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  /**
   * Creates an appointment request
   * @param roomId associated room
   * @param userId associated user
   * @param startTime beginning of appointment
   * @param endTime end of appointment
   */
  public createRequest(roomId: number, userId: number, startTime: string, endTime: string): Observable<any> {

  }

  /**
   * Edits an appointment
   * @param roomId associated room
   * @param userId associated user
   * @param startTime beginning of appointment
   * @param endTime end of appointment
   * @param appointmentId appointment id
   * @param seriesId associated series of appointment
   */
  public editAppointment(roomId: number, userId: number, startTime: string, endTime: string, appointmentId: number, seriesId: number): Observable<any> {

  }

  /**
   * Cancel appointment
   * @param appointmentId Id of an appointment
   * @param seriesId Id of the associated series
   */
  public cancelAppointment(appointmentId: number, seriesId: number): Observable<any> {

  }
}
