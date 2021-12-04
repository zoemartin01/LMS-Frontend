import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { User } from "../types/user";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  public getUserDetails(): Observable<any> {
  }

  public getFullName(user: User): string {
    return `${user.firstname} ${user.lastname}`;
  }

  public login(email: string, password: string): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.loginRoute}`;
    const requestBody = {
      email,
      password,
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  public logout(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.logoutRoute}`;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`
    });

    return this.httpClient.delete(apiURL, {headers: httpHeaders});
  }

  public tokenRefresh(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.tokenRefreshRoute}`;
    const requestBody = {
      token: this.getRefreshToken(),
    };

    return this.httpClient.post(apiURL, {headers: requestBody});
  }

  public tokenCheck(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.tokenTestRoute}`;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`
    });

    return this.httpClient.post(apiURL, {headers: httpHeaders});
  }

  public signin(firstname: string, lastname: string, email: string, password: string): Observable<any> {
  }

  public verifyEmail(userId: UserId, token: string): Observable<any> {
  }

  public setAccessToken(accessToken: string): void {
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);
  }

  public getAccessToken(): string {
    return <string>localStorage.getItem(environment.storageKeys.accessToken);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(environment.storageKeys.refreshToken, refreshToken);
  }

  public getRefreshToken(): string {
    return <string>localStorage.getItem(environment.storageKeys.refreshToken);
  }

  public setUserRole(userRole: string): void {
    localStorage.setItem(environment.storageKeys.userRole, userRole);
  }

  public getUserRole(): string {
    return <string>localStorage.getItem(environment.storageKeys.userRole);
  }

  public isUserLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  public isAdmin(): boolean {
    return this.getUserRole() === "admin";
  }
}
