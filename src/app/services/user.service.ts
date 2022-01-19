import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { User } from "../types/user";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for user management
 * @typedef {Service} UserService
 * @class
 */
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves user details
   * @param {UserId} userId Id of user
   */
  public getUserDetails(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.getCurrentUser}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Returns full name of specified user
   *
   * @param {User} user a user
   */
  public getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Changes data of user
   *
   * @param {object} changedData changed fields of user
   */
  public editUserData(changedData: object): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Registers user with their personal information
   *
   * @param {string} firstname new user's firstname
   * @param {string} lastname  new user's lastname
   * @param {string} email     new user's email address
   * @param {string} password  new user's password
   */
  public register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.register}`;
    const requestBody = {
      firstname,
      lastname,
      email,
      password
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Verifies email address using a token sent on register
   *
   * @param {UserId} userId user's id
   * @param {string} token  token to verify email
   */
  public verifyEmail(userId: UserId, token: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.verifyEmail}`;
    const requestBody = {
      userId,
      token
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes user
   */
  public deleteUser(): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }
}
