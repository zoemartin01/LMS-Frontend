import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Room } from "../types/room";
import { RoomId } from "../types/aliases/room-id";
import { RoomTimespan } from "../types/room-timespan";
import { TimespanId } from "../types/aliases/timespan-id";
import { Appointment } from "../types/appointment";
import { RoomTimespanType } from "../types/enums/timespan-type";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the room management
 * @typedef {Service} RoomService
 * @class
 */
export class RoomService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets data of all rooms
   */
  public getRoomsData(): Observable<Room[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAllRooms}`;

    return this.httpClient.get<Room[]>(apiURL);
  }

  /**
   * Gets room data
   *
   * @param {RoomId} roomId id of room
   */
  public getRoomData(roomId: RoomId): Observable<Room> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getSingleRoom}`;

    return this.httpClient.get<Room>(apiURL);
  }

  /**
   * Creates room with data
   *
   * @param {Room} room data of new room
   */
  public createRoom(room: Room): Observable<Room> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createRoom}`;
    const requestBody = {
      room: room
    };

    return this.httpClient.post<Room>(apiURL, requestBody);
  }

  /**
   * Changes data of room
   *
   * @param {RoomId} roomId      id of associated room
   * @param {object} changedData changed fields of room
   */
  public editRoomData(roomId: RoomId, changedData: object): Observable<Room> {
    if(roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.updateRoom.replace(':id', roomId)}`;
    const requestBody = {
      roomId: roomId,
      changedData: changedData,
    };

    return this.httpClient.patch<Room>(apiURL, requestBody);
  }

  /**
   * Deletes room
   *
   * @param {RoomId} roomId id of room
   */
  public deleteRoom(roomId: RoomId): Observable<Room> {
    if(roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteRoom.replace(':id', roomId)}`;

    return this.httpClient.delete<Room>(apiURL);
  }

  /**
   * Creates timeslot where room is available, room is now bookable in this timeslot
   *
   * @param {RoomTimespan} timeslot time
   */
  public createAvailableTimeslot(timeslot: RoomTimespan): Observable<RoomTimespan> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot}`;
    const requestBody = {
      timeslot: timeslot,
    };

    return this.httpClient.post<RoomTimespan>(apiURL, requestBody);
  }

  /**
   * Creates timeslot where room is unavailable, room is now not bookable in the timeslot
   *
   * @param {RoomTimespan} timeslot time
   */
  public createUnavailableTimeslot(timeslot: RoomTimespan): Observable<RoomTimespan> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot}`;
    const requestBody = {
      timeslot: timeslot,
    };

    return this.httpClient.post<RoomTimespan>(apiURL, requestBody);
  }

  /**
   * Deletes an available timeslot
   *
   * @param {TimespanId} timespanId id of timeslot
   */
  public deleteAvailableTimeslot(timespanId: TimespanId): Observable<RoomTimespan> {
    if(timespanId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':timeslot_id', timespanId)}`;

    return this.httpClient.delete<RoomTimespan>(apiURL);
  }

  /**
   * Deletes an unavailable timeslot
   *
   * @param {TimespanId} timespanId id of timeslot
   */
  public deleteUnavailableTimeslot(timespanId: TimespanId): Observable<RoomTimespan> {
    if(timespanId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':timeslot_id', timespanId)}`;

    return this.httpClient.delete<RoomTimespan>(apiURL);
  }

  /**
   * Get data of room to easily display room calendar
   *
   * @param {RoomId} roomId id of room for which the calendar should be shown
   */
  public getRoomCalendar(roomId: RoomId): Observable<{ calendar: RoomTimespan[][][], minTimeslot: number }> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getRoomCalendar}`;

    return this.httpClient.get<{ calendar: RoomTimespan[][][], minTimeslot: number }>(apiURL);

  }

  /**
   * Converts RoomTimespan to Appointment
   *
   * @param {RoomTimespan} timespan timespan to convert
   */
  public timespanToAppointment(timespan: RoomTimespan): Appointment {
    return <Appointment>timespan;
  }
}
