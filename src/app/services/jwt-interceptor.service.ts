import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.authService.getAccessToken();

    if (accessToken === null) {
      return next.handle(req);
    }

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return next.handle(tokenizedReq);
  }
}
