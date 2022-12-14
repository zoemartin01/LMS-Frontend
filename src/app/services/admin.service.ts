import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { GlobalSetting } from "../types/global-setting";
import { User } from "../types/user";
import { UserId } from "../types/aliases/user-id";
import { UserRole } from "../types/enums/user-role";
import { WhitelistRetailer } from "../types/whitelist-retailer";
import { WhitelistRetailerId } from "../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomain } from '../types/whitelist-retailer-domain';
import { WhitelistRetailerDomainId } from "../types/aliases/whitelist-retailer-domain-id";
import { PagedResponse } from '../types/paged-response';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for admin management
 * @typedef {Service} AdminService
 * @class
 */
export class AdminService {
  /**
   * constructor
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets global settings
   */
  public getGlobalSettings(): Observable<GlobalSetting[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getGlobalSettings}`;

    return this.httpClient.get<GlobalSetting[]>(apiURL);
  }

  /**
   * Gets user data
   *
   * @param {UserId} userId id of user
   */
  public getUser(userId: UserId): Observable<User> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getSingleUser
      .replace(':id', userId)}`;

    return this.httpClient.get<User>(apiURL);
  }

  /**
   * Gets pending users
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getPendingUsers(limit: number = 0, offset: number = 0): Observable<PagedResponse<User>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getAllPendingUsers}` +
    `?limit=${limit}&offset=${offset}`

    return this.httpClient.get<PagedResponse<User>>(apiURL);
  }

  /**
   * Gets accepted users
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAcceptedUsers(limit: number = 0, offset: number = 0): Observable<PagedResponse<User>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getAllAcceptedUsers}` +
      `?limit=${limit}&offset=${offset}`

    return this.httpClient.get<PagedResponse<User>>(apiURL);
  }

  /**
   * Changes global settings
   *
   * @param {object} changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<GlobalSetting[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateGlobalSettings}`;

    return this.httpClient.patch<GlobalSetting[]>(apiURL, changedData);
  }

  /**
   * Changes user data
   *
   * @param {object} changedData changed fields of user
   * @param {UserId} userId id of user
   */
  public updateUser(userId: UserId, changedData: object): Observable<User> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.updateUser
      .replace(':id', userId)}`;

    return this.httpClient.patch<User>(apiURL, changedData);
  }

  /**
   * Deletes user
   *
   * @param {UserId} userId if of user
   */
  public deleteUser(userId: UserId): Observable<void> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.deleteUser
      .replace(':id', userId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Gets whitelist retailer data
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return this.httpClient.get<WhitelistRetailer>(apiURL);
  }

  /**
   * Gets all whitelist retailers
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getWhitelistRetailers(limit: number = 0, offset: number = 0): Observable<PagedResponse<WhitelistRetailer>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailers}` +
    `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<WhitelistRetailer>>(apiURL);
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param {String[]} domains new whitelist retailer domains
   * @param {String} name new name of whitelist retailer
   */
  public createWhitelistRetailer(domains: String[], name: String): Observable<WhitelistRetailer> {

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.createWhitelistRetailer}`;

    return this.httpClient.post<WhitelistRetailer>(apiURL, { domains, name });
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of whitelist retailer
   */
  public editWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId, changedData: object)
    : Observable<WhitelistRetailer> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return this.httpClient.patch<WhitelistRetailer>(apiURL, changedData);
  }

  /**
   * Deletes whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): Observable<void> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Adds domain to whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {string} whitelistRetailerDomain new whitelist retailer domain
   */
  public addDomainToWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomain: string): Observable<WhitelistRetailerDomain> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.addDomainToWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return this.httpClient.post<WhitelistRetailerDomain>(apiURL, { domain: whitelistRetailerDomain });
  }

  /**
   * Edits domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of domain of a whitelist retailer
   *
   */
  public editDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId, changedData: object): Observable<WhitelistRetailerDomain> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateDomainOfWhitelistRetailer
      .replace(':id', whitelistRetailerId).replace(':domainId', whitelistRetailerDomainId)}`;

    return this.httpClient.patch<WhitelistRetailerDomain>(apiURL, changedData);
  }

  /**
   * Deletes domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<void> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteDomainOfWhitelistRetailer
      .replace(':id', whitelistRetailerId).replace(':domainId', whitelistRetailerDomainId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Sets user request to accepted
   *
   * @param {UserId} userId id of pending user
   */
  public acceptUserRequest(userId: UserId): Observable<any> {
    return this.updateUser(userId, { role: UserRole.visitor });
  }

  /**
   * Declines user request and deletes user
   *
   * @param {UserId} userId id of pending user
   */
  public declineUserRequest(userId: UserId): Observable<void> {
    return this.deleteUser(userId);
  }

  /**
   * Checks domain against whitelist
   *
   * @param {string} domain domain which is checked against whitelist
   */
  public checkDomainAgainstWhitelist(domain: string): Observable<{isWhitelisted : boolean}> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.checkDomainAgainstWhitelist}`;

    return this.httpClient.post<{isWhitelisted : boolean}>(apiURL, { domain });
  }
}
