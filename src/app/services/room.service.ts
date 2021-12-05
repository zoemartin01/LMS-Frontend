import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() {
  }

  /**
   * Creates room with data
   *
   * @param roomName name of room
   * @param description description
   * @param maxConBookings maximum of concurrent bookings possible
   */
  public createRoom(roomName: string, description: string, maxConBookings: number): Observable<any> {
  }

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

  //@todo (un-)available times setRoomData
}
