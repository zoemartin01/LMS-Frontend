import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {WhitelistRetailer} from "../types/whitelist-retailer";
import {WhitelistRetailerId} from "../types/aliases/whitelist-retailer-id";
import {WhitelistRetailerDomain} from '../types/whitelist-retailer-domain';
import {WhitelistRetailerDomainId} from "../types/aliases/whitelist-retailer-domain-id";
import {UserId} from "../types/aliases/user-id";
import {UserRole} from "../types/enums/user-role";
import {ParseArgumentException} from "@angular/cli/models/parser";

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
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getGlobalSettings}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Gets user data
   *
   * @param {UserId} userId id of user
   */
  public getUser(userId: UserId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getSingleUser}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Gets users
   */
  public getUsers(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.getAllUsers}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Changes global settings
   *
   * @param {object} changedData changed fields of global settings
   */
  public updateGlobalSettings(changedData: object): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateGlobalSettings}`;

    return this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Changes user data
   *
   * @param {object} changedData changed fields of user
   * @param {UserId} userId if of user
   */
  public updateUser(userId: UserId, changedData: object): Observable<any> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.updateUser.replace(':id', userId)}`;
    const requestBody = {
      userId: userId,
      changedData: changedData,
    };

    return this.httpClient.patch(apiURL, requestBody);
  }

  /**
   * Deletes user
   *
   * @param {UserId} userId if of user
   */
  public deleteUser(userId: UserId): Observable<any> {
    if (userId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_management.deleteUser.replace(':id', userId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Gets whitelist retailer data
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailer}`;
    return this.httpClient.get(apiURL);
  }

  /**
   * Gets all whitelist retailers
   *
   */
  public getWhitelistRetailers(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailers}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param {WhitelistRetailer} whiteListRetailer data of new whitelist retailer
   */
  public createWhitelistRetailer(whiteListRetailer: WhitelistRetailer): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.createWhitelistRetailer}`;
    const requestBody = {
      whitelistRetailer: whiteListRetailer
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of whitelist retailer
   */
  public editWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId, changedData: object): Observable<any> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateWhitelistRetailer.replace(':id', whitelistRetailerId)}`;
    const requestBody = {
      whitelistRetailerId: whitelistRetailerId,
      changedData: changedData,
    };

    return this.httpClient.patch(apiURL, requestBody);
  }

  /**
   * Deletes whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): Observable<any> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteWhitelistRetailer.replace(':id', whitelistRetailerId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Adds domain to whitelist retailer
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {WhitelistRetailerDomain} whitelistRetailerDomain new whitelist retailer domain
   */
  public addDomainToWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomain: WhitelistRetailerDomain): Observable<any> {
    if (whitelistRetailerId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.addDomainToWhitelistRetailer}`;
    const requestBody = {
      whitelistRetailerId: whitelistRetailerId,
      whitelistRetailerDomain: whitelistRetailerDomain
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Edits domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   * @param {object} changedData changed fields of domain of a whitelist retailer
   *
   */
  public editDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId, changedData: object): Observable<any> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.updateDomainOfWhitelistRetailer.replace(':id', whitelistRetailerDomainId)}`;
    const requestBody = {
      whitelistRetailerId: whitelistRetailerId,
      whitelistRetailerDomainId: whitelistRetailerDomainId,
      changedData: changedData,
    };

    return this.httpClient.patch(apiURL, requestBody);
  }

  /**
   * Deletes domain of whitelist retailer
   *
   * @param {WhitelistRetailerDomainId} whitelistRetailerDomainId id of whitelist retailer domain
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public deleteDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<any> {
    if (whitelistRetailerId === null || whitelistRetailerDomainId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteDomainOfWhitelistRetailer.replace(':id', whitelistRetailerDomainId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Sets user request to accepted
   *
   * @param {UserId} userId id of pending user
   */
  public acceptUserRequest(userId: UserId): Observable<any> {
    return this.updateUser(userId, {userRole: UserRole.visitor});
  }

  /**
   * Declines user request and deletes user
   *
   * @param {UserId} userId id of pending user
   */
  public declineUserRequest(userId: UserId): Observable<any> {
    return this.deleteUser(userId);
  }

  /**
   * Checks domain against whitelist
   *
   * @param {String} domain domain which is checked against whitelist
   */
  public checkDomainAgainstWhitelist(domain: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.admin_settings.checkDomainAgainstWhitelist}`;
    return this.httpClient.post(apiURL, {domain});
  }
}
