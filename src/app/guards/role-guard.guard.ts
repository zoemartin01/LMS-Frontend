import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAdmin()){
      return true;
    }

    return this.router.parseUrl('/dashboard');
  }
}

