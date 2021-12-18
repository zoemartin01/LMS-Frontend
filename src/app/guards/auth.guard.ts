import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Checks if user is logged in and otherwise redirects user to login page
   *
   * @param {ActivatedRouteSnapshot} route route that activated the guard
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isUserLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
