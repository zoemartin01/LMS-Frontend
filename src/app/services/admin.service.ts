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
  public async getGlobalSettings(): Observable<any> {
  }

  /**
   * Get user data
   */
  public async getUserData(): Observable<any> {
  }

  /**
   * Changes data of user
   *
   * @param userId      id of associated user
   * @param changedData changed fields of user
   */
  public editUserData(userId: UserId, changedData: object): Observable<any> {
  }

  /**
   * Changes global settings
   *
   * @param changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<any> {
  }

  /**
   * Deletes user
   *
   * @param userId id of user to delete
   */
  public deleteUser(userId: number): Observable<any> {
  }
}
