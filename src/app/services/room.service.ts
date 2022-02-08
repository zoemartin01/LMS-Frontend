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
import { PagedResponse } from '../types/paged-response';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the room management
 * @typedef {Service} RoomService
 * @class
 */
export class RoomService {
  /**
   * constructor
   *
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets data of all rooms
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getRoomsData(limit: number = 0, offset: number = 0): Observable<PagedResponse<Room>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAllRooms}` +
    `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Room>>(apiURL);
  }

  /**
   * Gets room data
   *
   * @param {RoomId} roomId id of room
   */
  public getRoomData(roomId: RoomId): Observable<Room> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getSingleRoom
      .replace(':id', roomId)}`;

    return this.httpClient.get<Room>(apiURL);
  }

  /**
   * Gets a single timespan
   *
   * @param {RoomId} roomId id of room
   * @param {TimespanId} timeslotId id of timespan
   */
  public getTimeslot(roomId: RoomId, timeslotId: TimespanId): Observable<RoomTimespan> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    if (timeslotId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getTimeslot
      .replace(':id', roomId).replace(':timeslotId', timeslotId)}`;

    return this.httpClient.get<RoomTimespan>(apiURL);
  }

  /**
   * Creates room with data
   *
   * @param {string} name name of room
   * @param {string} description description of room
   * @param {number} maxConcurrentBookings maximum concurrent appointments of room
   * @param {boolean} autoAcceptBookings automatic acceptance of appointment requests
   */
  public createRoom(name: string, description: string, maxConcurrentBookings: number, autoAcceptBookings: boolean)
    : Observable<Room> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createRoom}`;
    const requestBody = {
      name: name,
      description: description,
      maxConcurrentBookings: maxConcurrentBookings,
      autoAcceptBookings: autoAcceptBookings,
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

    return this.httpClient.patch<Room>(apiURL, changedData);
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
    //TODO not timeslot param but parameters of timeslot
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
   * @param {string|null} date date contained in week the calendar should be shown
   */
  public getRoomCalendar(roomId: RoomId, date: number|null = null)
    : Observable<{ calendar: (Appointment|string|null)[][][], minTimeslot: number }> {
    if(roomId === null) {
      throw ParseArgumentException;
    }

    const dateString = date === null ? '' : `?date=${date}`;

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getRoomCalendar
      .replace(':id', roomId)}${dateString}`;

    return this.httpClient.get<{ calendar: (Appointment|string|null)[][][], minTimeslot: number }>(apiURL);
  }

  /**
   * Get data of room to easily display calendar of availabilities
   *
   * @param {RoomId} roomId id of room for which the calendar should be shown
   * @param {number|null} date date contained in week the calendar should be shown
   */
  public getAvailabilityCalendar(roomId: RoomId, date: number|null = null)
    : Observable<string[][]> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    const dateString = date === null ? '' : `?date=${date}`;

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAvailabilityCalendar
      .replace(':id', roomId)}${dateString}`;

    return this.httpClient.get<string[][]>(apiURL);
  }

  /**
   * Get array of all available timeslots of a room
   *
   * @param {RoomId} roomId id of room for which the calendar should be shown
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAvailableTimeslots(
    roomId: RoomId,
    limit: number = 0,
    offset: number = 0
  ): Observable<PagedResponse<RoomTimespan>> {
    let apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAllAvailableTimeslotsForRoom
        .replace(':roomId', <string>roomId)}?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<RoomTimespan>>(apiURL);
  }

  /**
   * Get array of all unavailable timeslots of a room
   *
   * @param {RoomId} roomId id of room for which the calendar should be shown
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getUnavailableTimeslots(
    roomId: RoomId,
    limit: number = 0,
    offset: number = 0
  ): Observable<PagedResponse<RoomTimespan>> {
    let apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAllUnavailableTimeslotsForRoom
      .replace(':roomId', <string>roomId)}?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<RoomTimespan>>(apiURL);
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
