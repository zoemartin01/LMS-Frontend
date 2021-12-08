import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {AuthService} from "../services/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 401 && this.authService.isUserLoggedIn()) {
        return this.handleUnauthorized(request, next);
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }))
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.tokenRefresh().pipe(
      switchMap((res: { accessToken: string }) => {
        this.authService.setAccessToken(res.accessToken);
        return next.handle(request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getAccessToken()}`,
          }
        }));
      })
    );
  }
}
