import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { User } from "../types/user";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves user details
   */
  public getUserDetails(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.userDetails}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Returns full name of specified user
   *
   * @param user a user
   */
  public getFullName(user: User): string {
    return `${user.firstname} ${user.lastname}`;
  }

  /**
   * Logs in user with specified credentials
   *
   * @param email    user's email address
   * @param password user's password
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

    //@todo check HTTP method
    return this.httpClient.delete(apiURL);
  }

  /**
   * Refreshs authentication token of current user
   */
  public tokenRefresh(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.tokenRefresh}`;
    const requestBody = {
      token: this.getRefreshToken(),
    };

    return this.httpClient.post(apiURL, {headers: requestBody});
  }

  /**
   * Checks token of current user
   */
  public tokenCheck(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.tokenTest}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Signs in user with his personal information
   *
   * @param firstname new user's firstname
   * @param lastname  new user's lastname
   * @param email     new user's email address
   * @param password  new user's password
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
   * @param userId user's id
   * @param token  token to verify email
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
   * Saves access token in local storage
   *
   * @param accessToken new value of access token
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
   * @param refreshToken new value of refresh token
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
   * @param userRole
   */
  public setUserRole(userRole: string): void {
    localStorage.setItem(environment.storageKeys.userRole, userRole);
  }

  /**
   * Returns user role from local storage
   */
  public getUserRole(): string {
    return <string>localStorage.getItem(environment.storageKeys.userRole);
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
    return this.getUserRole() === "admin";
  }
}
