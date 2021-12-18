import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { WhitelistRetailer } from "../types/whitelist-retailer";
import { WhitelistRetailerId } from "../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomain } from '../types/whitelist-retailer-domain';
import { WhitelistRetailerDomainId } from "../types/aliases/whitelist-retailer-domain-id";
import {UserId} from "../types/aliases/user-id";
import {TimespanId} from "../types/aliases/timespan-id";
import {ConfirmationStatus} from "../types/enums/confirmation-status";
import {UserRole} from "../types/enums/user-role";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for admin management
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
   * Gets user data
   * @param userId id of user
   */
  public getUser(userId: UserId): Observable<any> {}

  /**
   * Gets users
   */
  public getUsers(): Observable<any> {
  }

  /**
   * Changes global settings
   *
   * @param {object} changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<any> {
  }


  /**
   * Changes user data
   *
   * @param {object} changedData changed fields of user
   * @param {UserId} userId if of user
   */
  public updateUser(userId : UserId, changedData: object): Observable<any> {}

  /**
   * Deletes user
   *
   * @param {UserId} userId if of user
   */
  public deleteUser(userId : UserId): Observable<any> {}

  /**
   * Gets whitelist retailer data
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
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
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
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
   * @param {WhitelistRetailerDomain} whitelistRetailerDomain new whitelist retailer domain
   */
  public addDomainToWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomain: WhitelistRetailerDomain): Observable<any> {
  }

  /**
   * Edits domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   *
   */
  public editDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<any> {
  }

  /**
   * Deletes domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<any> {
  }

  /**
   * Sets user request to accepted
   *
   * @param {UserId} userId id of pending user
   */
  public acceptUserRequest(userId: UserId): Observable<any> {
    return this.updateUser(userId, { userRole: UserRole.visitor });
  }

  /**
   * Declines user request and deletes user
   *
   * @param {UserId} userId id of pending user
   */
  public declineUserRequest(userId: UserId): Observable<any> {
    return this.deleteUser(userId);
  }
}
