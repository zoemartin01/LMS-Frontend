import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Room } from "../types/room";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for the room management
 */
export class RoomService {

  constructor(private httpClient: HttpClient) {
  }
  //TODO get roomsData -> list rooms

  /**
   * Gets room data
   *
   * @param roomId id of room
   */
  public getRoomData(roomId: number): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.viewRoom}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates room with data
   *
   * @param room data of new room
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
   * @param roomId      id of associated room
   * @param changedData changed fields of room
   */
  public editRoomData(roomId: number, changedData: object): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.editRoom}`;
    const requestBody = {
      roomId: roomId,
      changedData: changedData,
    };

    return this.httpClient.patch(apiURL, requestBody);
  }

  /**
   * Deletes room
   *
   * @param roomId id of room
   */
  public deleteRoom(roomId: number): Observable<any> {
    //TODO zugriff über view aber auch list
  }

  //@todo (un-)available times setRoomData
}
