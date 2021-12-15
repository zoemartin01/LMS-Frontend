import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UserId } from "../types/aliases/user-id";
import { User } from "../types/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for user
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
  public getUserDetails(userId : UserId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.userDetails}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Returns full name of specified user
   *
   * @param {User} user a user
   */
  public getFullName(user: User): string {
    return `${user.firstname} ${user.lastname}`;
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
   * Signs in user with his personal information
   *
   * @param {string} firstname new user's firstname
   * @param {string} lastname  new user's lastname
   * @param {string} email     new user's email address
   * @param {string} password  new user's password
   */
  public signin(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.signin}`;
    const requestBody = {
      firstname,
      lastname,
      email,
      password
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Verifies email address using a token sent on signin
   *
   * @param {UserId} userId user's id
   * @param {string} token  token to verify email
   */
  public verifyEmail(userId: UserId, token: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.verifyEmail}`;
    const requestBody = {
      userId,
      token
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes user
   *
   * @param {UserId} userId id of user to delete
   */
  public deleteUser(userId: UserId): Observable<any> {
  }
}
