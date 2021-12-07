import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


  /**
   * Gets global settings
   */
  public async getGlobalSettings(): Observable<any> {
  }


  /**
   * Changes data of user
   *
   * @param userId      id of associated user
   * @param changedData changed fields of user
   */
  public editUserData(userId: number, changedData: object): Observable<any> {
  }

  /**
   * Changes global settings
   *
   * @param changedData changed fields of global settings
   */
  public editGlobalSettings(changedData: object): Observable<any> {
  }

  /**
   * Deletes user
   *
   * @param userId id of user to delete
   */
  public deleteUser(userId: number): Observable<any> {
  }
}
