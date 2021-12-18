import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

import {UserRole} from "../types/enums/user-role";

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides API access for authentication system
 * @typedef {Service} AuthService
 * @class
 */
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Logs in user with specified credentials
   *
   * @param {string} email    user's email address
   * @param {string} password user's password
   */
  public login(email: string, password: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.login}`;
    const requestBody = {
      email,
      password,
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Logs out current user
   */
  public logout(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.logout}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Refreshes authentication token of current user
   */
  public tokenRefresh(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.tokenRefresh}`;
    const requestBody = {
      token: this.getRefreshToken(),
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Checks token of current user
   */
  public tokenCheck(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.tokenCheck}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Saves access token in local storage
   *
   * @param {string} accessToken new value of access token
   */
  public setAccessToken(accessToken: string): void {
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);
  }

  /**
   * Returns access token from local storage
   */
  public getAccessToken(): string {
    return <string>localStorage.getItem(environment.storageKeys.accessToken);
  }

  /**
   * Saves refresh token in local storage
   *
   * @param {string} refreshToken new value of refresh token
   */
  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(environment.storageKeys.refreshToken, refreshToken);
  }

  /**
   * Returns refresh token from local storage
   */
  public getRefreshToken(): string {
    return <string>localStorage.getItem(environment.storageKeys.refreshToken);
  }

  /**
   * Saves user role in local storage
   *
   * @param {UserRole} userRole
   */
  public setUserRole(userRole: UserRole): void {
    localStorage.setItem(environment.storageKeys.userRole, userRole.toString());
  }

  /**
   * Returns user role from local storage
   */
  public getUserRole(): UserRole {
    let userRole = localStorage.getItem(environment.storageKeys.userRole);

    if (userRole === null) {
      return UserRole.unknown;
    }

    return +userRole;
  }

  /**
   * Returns if current user is logged in
   */
  public isUserLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Returns if current user is admin
   */
  public isAdmin(): boolean {
    return this.getUserRole() === UserRole.admin;
  }
}
