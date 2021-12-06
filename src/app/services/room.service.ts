import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Room } from "../types/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() {
  }

  /**
   * Creates room with data
   *
   * @param room data of new room
   */
  public createRoom(room: Room): Observable<any> {
  }
  //@todo (un-)available times setRoomData

  /**
   * Changes data of room
   *
   * @param roomId      id of associated room
   * @param changedData changed fields of room
   */
  public editRoomData(roomId: number, changedData: object): Observable<any> {
  }

  /**
   * Deletes room
   *
   * @param roomId id of room
   */
  public deleteRoom(roomId: number): Observable<any> {
  }


}
