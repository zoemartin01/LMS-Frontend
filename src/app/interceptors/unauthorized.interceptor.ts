import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {lastValueFrom, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import {AuthService} from "../services/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 401 && this.authService.isUserLoggedIn()) {
        lastValueFrom(
          this.authService.tokenRefresh()
        ).then((res: { accessToken: string }) => {
          this.authService.setAccessToken(res.accessToken);
        });
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }))
  }
}
