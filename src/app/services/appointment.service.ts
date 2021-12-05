import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Appointment} from "../types/appointment";
import {AppointmentId} from "../types/aliases/appointment-id";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  /**
   * Creates a new appointment request
   * @param appointment all data about the requested appointment
   */
  public createRequest(appointment: Appointment): Observable<any> {

  }

  /**
   * Edits an appointment
   * @param appointmentId id of the appointment to be edited
   * @param appointment edited version
   */
  public editAppointment(appointmentId : AppointmentId, appointment: Appointment): Observable<any> {

  }

  /**
   * Cancel appointment
   * @param appointmentId Id of an appointment
   */
  public cancelAppointment(appointmentId: number): Observable<any> {

  }
}
