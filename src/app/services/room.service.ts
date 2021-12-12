import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Room } from "../types/room";
import { RoomId } from "../types/aliases/room-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the room management
 */
export class RoomService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets data of all rooms
   */
  public getRoomsData(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.rooms}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Gets room data
   *
   * @param {RoomId} roomId id of room
   */
  public getRoomData(roomId: RoomId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.viewRoom}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates room with data
   *
   * @param {Room} room data of new room
   */
  public createRoom(room: Room): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.createRoom}`;
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
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.editRoom.replace(':id', roomId)}`;
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
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.deleteRoom.replace(':id', roomId)}`;

    return this.httpClient.delete(apiURL);
  }

  //@todo (un-)available times setRoomData
}
