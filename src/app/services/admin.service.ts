import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { WhitelistRetailer } from "../types/whitelist-retailer";
import { WhitelistRetailerId } from "../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomain } from '../types/whitelist-retailer-domain';
import { WhitelistRetailerDomainId } from "../types/aliases/whitelist-retailer-domain-id";
import { UserId } from "../types/aliases/user-id";
import { UserRole } from "../types/enums/user-role";
import {GlobalSetting} from "../types/global-setting";
import {User} from "../types/user";

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
  public getGlobalSettings(): Observable<GlobalSetting[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getGlobalSettings}`;

    return <Observable<GlobalSetting[]>>this.httpClient.get(apiURL);
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
      .replace(':id', userId)}}`;

    return <Observable<User>>this.httpClient.get(apiURL);
  }

  /**
   * Gets users
   */
  public getUsers(): Observable<User[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getAllUsers}`;

    return <Observable<User[]>>this.httpClient.get(apiURL);
  }

  /**
   * Changes global settings
   *
   * @param {object} changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<GlobalSetting[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateGlobalSettings}`;

    return <Observable<GlobalSetting[]>>this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Changes user data
   *
   * @param {object} changedData changed fields of user
   * @param {UserId} userId if of user
   */
  public updateUser(userId: UserId, changedData: object): Observable<User> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.updateUser
      .replace(':id', userId)}`;

    return <Observable<User>>this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Deletes user
   *
   * @param {UserId} userId if of user
   */
  public deleteUser(userId: UserId): Observable<User> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.deleteUser
      .replace(':id', userId)}`;

    return <Observable<User>>this.httpClient.delete(apiURL);
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

    return <Observable<WhitelistRetailer>>this.httpClient.get(apiURL);
  }

  /**
   * Gets all whitelist retailers
   *
   */
  public getWhitelistRetailers(): Observable<WhitelistRetailer[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailers}`;

    return <Observable<WhitelistRetailer[]>>this.httpClient.get(apiURL);
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param {WhitelistRetailer} whiteListRetailer data of new whitelist retailer
   */
  public createWhitelistRetailer(whiteListRetailer: WhitelistRetailer): Observable<WhitelistRetailer> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.createWhitelistRetailer}`;

    return <Observable<WhitelistRetailer>>this.httpClient.post(apiURL, whiteListRetailer);
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of whitelist retailer
   */
  public editWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId, changedData: object): Observable<WhitelistRetailer> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return <Observable<WhitelistRetailer>>this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Deletes whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return <Observable<WhitelistRetailer>>this.httpClient.delete(apiURL);
  }

  /**
   * Adds domain to whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {WhitelistRetailerDomain} whitelistRetailerDomain new whitelist retailer domain
   */
  public addDomainToWhitelistRetailer(
    whitelistRetailerId: WhitelistRetailerId,
    whitelistRetailerDomain: WhitelistRetailerDomain
  ): Observable<WhitelistRetailerDomain> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.addDomainToWhitelistRetailer
      .replace(':id', whitelistRetailerId)}`;

    return <Observable<WhitelistRetailerDomain>>this.httpClient.post(apiURL, whitelistRetailerDomain);
  }

  /**
   * Edits domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of domain of a whitelist retailer
   *
   */
  public editDomainOfWhitelistRetailer(
    whitelistRetailerId: WhitelistRetailerId,
    whitelistRetailerDomainId: WhitelistRetailerDomainId,
    changedData: object
  ): Observable<WhitelistRetailerDomain> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateDomainOfWhitelistRetailer
      .replace(':id', whitelistRetailerId).replace(':domainId', whitelistRetailerDomainId)}`;

    return <Observable<WhitelistRetailerDomain>>this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Deletes domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteDomainOfWhitelistRetailer(
    whitelistRetailerId: WhitelistRetailerId,
    whitelistRetailerDomainId: WhitelistRetailerDomainId
  ): Observable<WhitelistRetailerDomain> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteDomainOfWhitelistRetailer
      .replace(':id', whitelistRetailerId).replace(':domainId', whitelistRetailerDomainId)}`;

    return <Observable<WhitelistRetailerDomain>>this.httpClient.delete(apiURL);
  }

  /**
   * Sets user request to accepted
   *
   * @param {UserId} userId id of pending user
   */
  public acceptUserRequest(userId: UserId): Observable<User> {
    return this.updateUser(userId, { userRole: UserRole.visitor });
  }

  /**
   * Declines user request and deletes user
   *
   * @param {UserId} userId id of pending user
   */
  public declineUserRequest(userId: UserId): Observable<User> {
    return this.deleteUser(userId);
  }

  /**
   * Checks domain against whitelist
   *
   * @param {String} domain domain which is checked against whitelist
   */
  public checkDomainAgainstWhitelist(domain: string): Observable<boolean> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.checkDomainAgainstWhitelist}`;

    return <Observable<boolean>>this.httpClient.post(apiURL, { domain });
  }
}
