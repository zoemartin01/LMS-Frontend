import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from "../services/auth.service";

@Injectable()

/**
 * Interceptor that adds the authentication  as header to outgoing requests
 * @typedef {HttpInterceptor} JwtInterceptor
 * @class
 */
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  /**
   * Adds the authentication token as header to request
   *
   * @param {HttpRequest<any>} request current request
   * @param {HttpHandler} next next function that handles the request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    let newReq = request;
    if (accessToken !== null) {
      newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
    }

    return next.handle(newReq);
  }
}
