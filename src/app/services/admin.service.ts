import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { UserId } from "../types/aliases/user-id";
import { WhitelistRetailer } from "../types/whitelist-retailer";
import { WhitelistRetailerId } from "../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomain } from '../types/whitelist-retailer-domain';
import { WhitelistRetailerDomainId } from "../types/aliases/whitelist-retailer-domain-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for admins
 * @typedef {Service} AdminService
 * @class
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
   * @param {UserId} userId Id of user
   */
  public getUserData(userId: UserId): Observable<any> {
  }

  /**
   * Changes data of user
   *
   * @param {UserId} userId      id of associated user
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
   * @param {UserId} userId id of user to delete
   */
  public deleteUser(userId: UserId): Observable<any> {
  }

  /**
   * Gets whitelist retailer data
   *
   * @param {WhitelistRetailerId} whitelistRetailerId of whitelist retailer
   */
  public getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<any> {
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
   * @param {WhitelistRetailerId} whitelistRetailerId id of associated whitelist retailer
   * @param {object} changedData changed fields of whitelist retailer
   */
  public editWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId, changedData: object): Observable<any> {
  }

  /**
   * Deletes whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): Observable<any> {
  }

  /**
   * Adds domain to whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {WhitelistRetailerDomain} whitelistRetailerDomain whitelist retailer domain
   */
  public addDomainToWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomain: WhitelistRetailerDomain): Observable<any> {
  }

  /**
   * Edits domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   *
   */
  public editDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<any> {
  }

  /**
   * Deletes domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<any> {
  }
}
