import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets global settings
   */
  public getGlobalSettings(): Observable<any> {
  }

  /**
   * Gets users
   */
  public getUsers(): Observable<any> {
  }

  /**
   * Gets data of user with id userId
   * @param {userId} userId Id of user
   */
  public getUserData(userId: UserId): Observable<any> {
  }

  /**
   * Changes data of user
   *
   * @param {userId} userId      id of associated user
   * @param {object} changedData changed fields of user
   */
  public editUserData(userId: UserId, changedData: object): Observable<any> {
  }

  /**
   * Changes global settings
   *
   * @param {object} changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<any> {
  }

  /**
   * Deletes user
   *
   * @param {userId} userId id of user to delete
   */
  public deleteUser(userId: number): Observable<any> {
  }
}
