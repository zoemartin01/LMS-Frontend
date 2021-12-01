import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.authService.getAccessToken();

    let newReq = req;
    if (accessToken !== null) {
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
    }

    return next.handle(newReq);
  }
}
