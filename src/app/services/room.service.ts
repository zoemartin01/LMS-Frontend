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

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms.updateRoom.replace(':id', roomId)}`;
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

  /**
   * Formats timespans to easily display them as calendar
   *
   * @param {RoomTimespan[][][]} room         room for which the calendar should be shown
   * @param {number}             appointments list of appointments of the room
   *
   * @todo maybe add endpoint for this in backend (code can be reused there)
   * @todo in any case refactor ist needed as this method is much too long
   */
  public getTimespansAsCalendar(
    room: Room, appointments: Appointment[]
  ): { displayTimespans: RoomTimespan[][][], minTimeslot: number } {
    //find out min and max timeslots in available timespans
    let minTimeslot = 23;
    let maxTimeslot = 0;
    for (let availableTimespan of room.availableTimeslots) {
      if (availableTimespan.start == null || availableTimespan.end == null) {
        continue;
      }

      let timespanStart = +availableTimespan.start.format("HH");
      if (timespanStart < minTimeslot) {
        minTimeslot = timespanStart;
      }

      let timespanEnd = +availableTimespan.end.format("HH");
      if (timespanEnd > maxTimeslot) {
        maxTimeslot = timespanEnd;
      }
    }

    if (minTimeslot === 23 && maxTimeslot === 0) {
      return { displayTimespans: [], minTimeslot: 0 };
    }

    //initialise array (timeslot, days, parallel bookings)
    let displayTimespans: RoomTimespan[][][] = [...Array((maxTimeslot - minTimeslot + 1))]
      .map(() => [...Array(7)]
        .map(() => Array(room.maxConBookings)));

    //set unavailable timespans due to different available timeslots
    //@todo handle case that there are multiple available timeslots per day
    for (let availableTimespan of room.availableTimeslots) {
      if (availableTimespan.start == null || availableTimespan.end == null) {
        continue;
      }

      let timespanStart = +availableTimespan.start.format("HH");
      if (timespanStart > minTimeslot) {
        let hour = +availableTimespan.start.format("HH");
        let day = (+availableTimespan.start.format("e")+6)%7;

        displayTimespans[hour][day][0] = {
          id: null,
          room: room,
          start: availableTimespan.start.subtract(timespanStart - minTimeslot, 'hours'),
          end: availableTimespan.start,
          type: RoomTimespanType.unavailable,
        };
      }

      let timespanEnd = +availableTimespan.end.format("HH");
      if (timespanEnd < maxTimeslot) {
        let hour = +availableTimespan.end.format("HH");
        let day = (+availableTimespan.end.format("e")+6)%7;

        displayTimespans[hour][day][0] = {
          id: null,
          room: room,
          start: availableTimespan.end,
          end: availableTimespan.end.add(maxTimeslot - timespanEnd, 'hours'),
          type: RoomTimespanType.unavailable,
        };
      }
    }

    //add all timespans to the calendar (appointments and unavailable timeslots)
    let timespans: RoomTimespan[] = appointments;
    timespans = timespans.concat(room.unavailableTimeslots);
    for (let timespan of timespans) {
      if (timespan.start == null || timespan.end == null){
        continue;
      }

      let hour = +timespan.start.format("HH");
      let day = (+timespan.start.format("e")+6)%7;

      displayTimespans[hour][day].push(timespan);
    }

    return { displayTimespans, minTimeslot };
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
