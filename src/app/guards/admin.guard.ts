import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Guard that provides authorisation for admins
 * @typedef {Guard} AdminGuard
 * @class
 */
export class AdminGuard implements CanActivate {
  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {Router} router router providing navigation
   */
  constructor(public authService: AuthService, public router: Router) {
  }

  /**
   * Checks if user is admin and otherwise redirects user to dashboard page
   *
   * @param {ActivatedRouteSnapshot} route route that activated the guard
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAdmin()
      ? true
      : this.router.parseUrl('/dashboard');
  }
}

