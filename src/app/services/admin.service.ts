import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { WhitelistRetailer } from "../types/whitelist-retailer";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for admins
 */
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

  /**
   * Gets whitelist retailer data
   *
   * @param {number} whitelistRetailerId of whitelist retailer
   */
  public getWhitelistRetailerData(whitelistRetailerId: number): Observable<any> {
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param {WhitelistRetailer} whiteListRetailer data of new whitelist retailer
   */
  public createWhitelistRetailer(whiteListRetailer: WhitelistRetailer): Observable<any> {
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param {number} whitelistRetailerId id of associated whitelist retailer
   * @param {object} changedData changed fields of whitelist retailer
   */
  public editWhitelistRetailerData(whitelistRetailerId: number, changedData: object): Observable<any> {
  }

  /**
   * Deletes whitelist retailer
   *
   * @param {number} whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: number): Observable<any> {
  }
}
