import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Room } from "../types/room";
import { RoomId } from "../types/aliases/room-id";
import { RoomTimespan } from "../types/room-timespan";
import { TimespanId } from "../types/aliases/timespan-id";

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
  public getRoomsData(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getAllRooms}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Gets room data
   *
   * @param {RoomId} roomId id of room
   */
  public getRoomData(roomId: RoomId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.getSingleRoom}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates room with data
   *
   * @param {Room} room data of new room
   */
  public createRoom(room: Room): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createRoom}`;
    const requestBody = {
      room: room
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Changes data of room
   *
   * @param {RoomId} roomId      id of associated room
   * @param {object} changedData changed fields of room
   */
  public editRoomData(roomId: RoomId, changedData: object): Observable<any> {
    if(roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.editRoom.replace(':id', roomId)}`;
    const requestBody = {
      roomId: roomId,
      changedData: changedData,
    };

    return this.httpClient.patch(apiURL, requestBody);
  }

  /**
   * Deletes room
   *
   * @param {RoomId} roomId id of room
   */
  public deleteRoom(roomId: RoomId): Observable<any> {
    if(roomId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteRoom.replace(':id', roomId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Creates timeslot where room is available, room is now bookable in this timeslot
   *
   * @param {RoomTimespan} timeslot time
   */
  public createAvailableTimeslot(timeslot: RoomTimespan) {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot}`;
    const requestBody = {
      timeslot: timeslot,
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Creates timeslot where room is unavailable, room is now not bookable in the timeslot
   *
   * @param {RoomTimespan} timeslot time
   */
  public createUnavailableTimeslot(timeslot: RoomTimespan) {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot}`;
    const requestBody = {
      timeslot: timeslot,
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes an available timeslot
   *
   * @param {TimespanId} timespanId id of timeslot
   */
  public deleteAvailableTimeslot(timespanId: TimespanId): Observable<any> {
    if(timespanId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':timeslot_id', timespanId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Deletes an unavailable timeslot
   *
   * @param {TimespanId} timespanId id of timeslot
   */
  public deleteUnavailableTimeslot(timespanId: TimespanId): Observable<any> {
    if(timespanId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':timeslot_id', timespanId)}`;

    return this.httpClient.delete(apiURL);
  }
}
