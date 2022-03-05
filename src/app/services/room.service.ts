import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import * as moment from "moment";

import { Room } from "../types/room";
import { RoomId } from "../types/aliases/room-id";
import { RoomTimespan } from "../types/room-timespan";
import { Appointment } from "../types/appointment";
import { TimespanId } from "../types/aliases/timespan-id";
import { SeriesId } from "../types/aliases/series-id";
import { RoomTimespanType } from "../types/enums/timespan-type";
import { TimeSlotRecurrence } from "../types/enums/timeslot-recurrence";
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

  /*
  Timeslot management
   */
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
   * Get data of room to easily display calendar of availabilities
   *
   * @param {RoomId} roomId id of room for which the calendar should be shown
   * @param {number|null} date date contained in week the calendar should be shown
   */
  public getAvailabilityCalendar(roomId: RoomId, date: number|null = null)
    : Observable<(string|null)[][]> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    const dateString = date === null ? '' : `?date=${date}`;

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAvailabilityCalendar
      .replace(':id', roomId)}${dateString}`;

    return this.httpClient.get<(string|null)[][]>(apiURL);
  }

  /**
   * Gets a single timeslot
   *
   * @param {RoomId} roomId id of room
   * @param {TimespanId} timeslotId id of timeslot
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
   * Creates a new timeslot
   *
   * @param {Room} room room of the timeslot
   * @param {moment.Moment} start start of the timeslot
   * @param {moment.Moment} end end of the timeslot
   * @param {RoomTimespanType} type type of the time slot
   * @param {boolean} force if true no warning is returned on conflict, appointments with conflicts are deleted
   */
  public createTimeslot(
    room : Room,
    start: moment.Moment,
    end: moment.Moment,
    type: RoomTimespanType,
    force: boolean
  ): Observable<RoomTimespan> {
    if (room.id === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot
      .replace(':roomId', room.id)}`;
    const requestBody = {
      start: start.toISOString(),
      end: end.toISOString(),
      type,
      force,
    };

    return this.httpClient.post<RoomTimespan>(apiURL, requestBody);
  }

  /**
   * Creates a new series of timeslots
   *
   * @param {Room} room room of the timeslot series
   * @param {moment.Moment} start start of the first timeslot in the series
   * @param {moment.Moment} end end of the first timeslot in the series
   * @param {RoomTimespanType} type type of the time slot
   * @param timeSlotRecurrence recurrence of the timeslot series
   * @param {number} amount 2-2048, amount of timeslots wanted for the series
   * @param {boolean} force if true no warning is returned on conflict, appointments with conflicts are deleted
   */
  public createTimeslotSeries(
    room: Room,
    start: moment.Moment,
    end: moment.Moment,
    type: RoomTimespanType,
    timeSlotRecurrence: TimeSlotRecurrence,
    amount: number,
    force: boolean
  ): Observable<RoomTimespan[]> {
    if (room.id === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslotSeries
      .replace(':roomId', room.id)}`;
    const requestBody = {
      start: start.toISOString(),
      end: end.toISOString(),
      type,
      timeSlotRecurrence,
      amount,
      force,
    };

    return this.httpClient.post<RoomTimespan[]>(apiURL, requestBody);
  }

  /**
   * Edits a timeslot
   *
   * @param {RoomId} roomId id of room
   * @param {TimespanId} timeslotId id of the timeslot to be edited
   * @param {object} changedData changed values
   */
  public editTimeslot(roomId: RoomId, timeslotId: TimespanId, changedData: object): Observable<RoomTimespan> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    if (timeslotId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.updateTimeslot
      .replace(':roomId', roomId).replace(':timeslotId', timeslotId)}`;

    return this.httpClient.patch<RoomTimespan>(apiURL, changedData);
  }

  /**
   * Edits a series of timeslots
   *
   * @param {RoomId} roomId id of room
   * @param {SeriesId} seriesId id of a series of timeslots to be edited
   * @param {object} changedData changed values
   */
  public editTimeslotSeries(roomId: RoomId, seriesId: SeriesId, changedData: object): Observable<RoomTimespan[]> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.updateTimeslotSeries
      .replace(':roomId', roomId).replace(':seriesId', seriesId)}`;

    return this.httpClient.patch<RoomTimespan[]>(apiURL, changedData);
  }

  /**
   * Deletes a timeslot
   *
   * @param {RoomId} roomId id of room
   * @param {TimespanId} timeslotId id of a timeslot to be deleted
   * @param {boolean} force if true no warning is returned on conflict, appointments with conflicts are deleted
   */
  public deleteTimeslot(roomId: RoomId, timeslotId: TimespanId, force: boolean): Observable<void> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    if (timeslotId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':roomId', roomId).replace(':timeslotId', timeslotId)}`;

    return this.httpClient.delete<void>(apiURL, {
      body: { force },
    });
  }

  /**
   * Deletes a series of timeslots
   *
   * @param {RoomId} roomId id of room
   * @param {SeriesId} seriesId id of a series of timeslots to be deleted
   * @param {boolean} force if true no warning is returned on conflict, appointments with conflicts are deleted
   */
  public deleteTimeslotSeries(roomId: RoomId, seriesId: SeriesId, force: boolean): Observable<void> {
    if (roomId === null) {
      throw ParseArgumentException;
    }

    if (seriesId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslotSeries
      .replace(':roomId', roomId).replace(':seriesId', seriesId)}`;

    return this.httpClient.delete<void>(apiURL, {
      body: { force },
    });
  }
}
