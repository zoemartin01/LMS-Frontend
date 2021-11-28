import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRoleArray = route.data['expectedRole'];

    const userRole = this.authService.getUserRole();

    let expectedRole;
    for (expectedRole of expectedRoleArray) {
      if (expectedRole === userRole){
        return true;
      }
    }

    return this.router.parseUrl('/dashboard');
  }
}

