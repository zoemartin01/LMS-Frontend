import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth.service";

import { UserRole } from "../../../types/enums/user-role";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Component for the login page
 * @typedef {Component} LoginComponent
 * @class
 */
export class LoginComponent {
  loginError: boolean = false;

  /**
   * Constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {Router} router router providing navigation
   */
  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Logs in user with provided credentials
   *
   * @param {NgForm} authForm submitted login form
   */
  public async login(authForm: NgForm): Promise<void> {
    const isActiveDirectory: boolean = false;
    if (authForm.valid) {
      this.authService.login(authForm.value.email, authForm.value.password, isActiveDirectory).subscribe({
        next: (res: {accessToken: string, refreshToken: string, role: string}) => {
          this.authService.setAccessToken(res.accessToken);
          this.authService.setRefreshToken(res.refreshToken);
          this.authService.setUserRole(<UserRole><unknown>res.role ?? UserRole.unknown);

          this.router.navigate(['/dashboard']);
        },
        error: error => {
          if (error.status == 400) {
            this.loginError = true;
          }else{
            console.error('There was an error!', error);
          }
        }
      })
    }
  }
}
