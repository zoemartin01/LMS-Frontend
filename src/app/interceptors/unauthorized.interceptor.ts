import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";

import { AuthService } from "../services/auth.service";

@Injectable()

/**
 * Interceptor that handles authorisation errors
 * @typedef {HttpInterceptor} UnauthorizedInterceptor
 * @class
 */
export class UnauthorizedInterceptor implements HttpInterceptor {
  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing appointment functionalities
   */
  constructor(private authService: AuthService) {
  }

  /**
   * Checks if an unauthorized error happened
   *
   * @param {HttpRequest<any>} request current request
   * @param {HttpHandler} next next function that handles the request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && this.authService.isUserLoggedIn()) {
        return this.handleUnauthorized(request, next);
      }

      return throwError(err);
    }));
  }

  /**
   * Handles an unauthorized error by refreshing token
   *
   * @param {HttpRequest<any>} request current request
   * @param {HttpHandler} next next function that handles the request
   * @private
   */
  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === `${environment.baseUrl}${environment.apiRoutes.auth.tokenRefresh}`) {
      localStorage.clear();
      return next.handle(request);
    }

    return this.authService.tokenRefresh().pipe(
      switchMap((res: { accessToken: string }) => {
        this.authService.setAccessToken(res.accessToken);
        return next.handle(request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getAccessToken()}`,
          }
        }));
      }),
      catchError(err => {
        return throwError(() => new Error(err));
      })
    );
  }
}
