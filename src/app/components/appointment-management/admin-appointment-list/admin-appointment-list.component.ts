import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import {AppointmentId} from "../../../types/aliases/appointment-id";
import { Appointment } from "../../../types/appointment";
import {NgForm} from "@angular/forms";
import {RoomId} from "../../../types/aliases/room-id";
//TODO add type
//TODO add alias

@Component({
  selector: 'app-admin-appointment-list',
  templateUrl: './admin-appointment-list.component.html',
  styleUrls: ['./admin-appointment-list.component.scss']
})
export class AdminAppointmentListComponent implements OnInit {
  public appointments: Appointment[] = [];

  constructor(public appointmentService: AppointmentService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all appointments with data
   */
  public getAppointmentsData(): Promise<void> {
  }

  /**
   * Opens appointment creation form
   */
  public openCreationForm(): void {
  }

  /**
   * Opens appointment edit form
   *
   * @param appointmentId id of appointment
   */
  public editAppointment(appointmentId: AppointmentId): Promise<void> {
  }

  /**
   * Accept appointment request
   * @param appReqId Id of an appointment request
   */
  public acceptAppointmentRequest(appReqId: number): Promise<void> {
    //set id
    //release request id
  }

  /**
   * Denies appointment request
   * @param appReqId  Id of an appointment request
   */
  public denyAppointmentRequest(appReqId: number): Promise<void> {
    //release request id
  }

  /**
   * Lists all appointment requests with data
   */
  public getAppointmentRequestsData(): Promise<void> {
  }

  /**
   * Opens appointment cancel popup
   *
   * @param appointmentId id of appointment
   */
  public cancelAppointment(appointmentId: AppointmentId): Promise<void> {
  }
}
