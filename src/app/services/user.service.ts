import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

import {User} from "../types/user";
import {UserId} from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for user management
 * @typedef {Service} UserService
 * @class
 */
export class UserService {

  /**
   * constructor
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves user details
   */
  public getUserDetails(): Observable<User> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.getCurrentUser}`;

    return <Observable<User>>this.httpClient.get(apiURL);
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
  public editUserData(changedData: object): Observable<User> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.updateCurrentUser}`;

    return <Observable<User>>this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Registers user with their personal information
   *
   * @param {string} firstName new user's firstname
   * @param {string} lastName  new user's lastname
   * @param {string} email     new user's email address
   * @param {string} password  new user's password
   */
  public register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.register}`;
    const requestBody = {
      firstName,
      lastName,
      email,
      password
    };

    return this.httpClient.post<User>(apiURL, requestBody);
  }

  /**
   * Verifies email address using a token sent on register
   *
   * @param {UserId} userId user's id
   * @param {string} token  token to verify email
   */
  public verifyEmail(userId: UserId, token: string): Observable<User> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.verifyEmail}`;
    const requestBody = {
      userId,
      token
    };

    return this.httpClient.post<User>(apiURL, requestBody);
  }

  /**
   * Deletes user
   */
  public deleteUser(): Observable<User> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.user_settings.deleteCurrentUser}`;
    return <Observable<User>>this.httpClient.delete(apiURL);
  }
}
