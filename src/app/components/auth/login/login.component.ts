import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
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
 *
 *
 */
export class LoginComponent {
  public loginForm: FormGroup = this.formBuilder.group({
    email: '',
    password: '',
  });
  loginError: boolean = false;
  loginErrorMessage: string = '';
  activeDirectory: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {Router} router router providing navigation
   * @param {FormBuilder} formBuilder angular form builder
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  /**
   * Logs in user with provided credentials
   */
  public async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.activeDirectory).subscribe({
        next: (res: { accessToken: string, refreshToken: string, userId: string, role: string }) => {
          this.authService.setAccessToken(res.accessToken);
          this.authService.setRefreshToken(res.refreshToken);
          this.authService.setUserId(res.userId);
          this.authService.setUserRole(<UserRole><unknown>res.role ?? UserRole.unknown);

          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.loginError = true;
          this.loginErrorMessage = error;
          console.error('There was an error!', error);
        }
      })
    }
  }
}
