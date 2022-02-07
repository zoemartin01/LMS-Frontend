import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

import { UserRole } from "../types/enums/user-role";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides API access for authentication system
 * @typedef {Service} AuthService
 * @class
 */
export class AuthService {

  /**
   * constructor
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Logs in user with specified credentials
   *
   * @param {string} email    user's email address
   * @param {string} password user's password
   * @param {boolean} isActiveDirectory if authentication should use ActiveDirectory
   */
  public login(email: string, password: string, isActiveDirectory: boolean)
    : Observable<{ accessToken: string, refreshToken: string, userId: string, role: string }> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.auth.login}`;
    const requestBody = {
      email,
      password,
      isActiveDirectory,
    };

    return this.httpClient
      .post<{ accessToken: string, refreshToken: string, userId: string, role: string }>(apiURL, requestBody);
  }

  /**
   * Logs out current user
   */
  public logout(): Observable<void> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.auth.logout}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Refreshes authentication token of current user
   */
  public tokenRefresh(): Observable<{ accessToken: string }> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.auth.tokenRefresh}`;
    const requestBody = {
      refreshToken: this.getRefreshToken(),
    };

    return this.httpClient.post<{ accessToken: string }>(apiURL, requestBody);
  }

  /**
   * Checks token of current user
   */
  public tokenCheck(): Observable<void> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.auth.tokenCheck}`;

    return this.httpClient.post<void>(apiURL, []);
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
   * Saves user id in local storage
   *
   * @param {UserId} userId
   */
  public setUserId(userId: string): void {
    localStorage.setItem(environment.storageKeys.userId, userId);
  }

  /**
   * Returns user id from local storage
   */
  public getUserId(): UserId {
    return <string>localStorage.getItem(environment.storageKeys.userId);
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
