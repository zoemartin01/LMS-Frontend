import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { WINDOW } from '../../../providers/window.providers';

import { AuthService } from "../../../services/auth.service";
import { UtilityService } from "../../../services/utility.service";

import { UserRole } from "../../../types/enums/user-role";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Component for the login page
 */
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  errorMessage: string = '';
  activeDirectory: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {Router} router router providing navigation
   * @param {Window} window window provider
   */
  constructor(
    private authService: AuthService,
    public utilityService: UtilityService,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
  }

  /**
   * Logs in user with provided credentials
   */
  public async login(): Promise<void> {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.activeDirectory).subscribe({
      next: (res: { accessToken: string, refreshToken: string, userId: string, role: string }) => {
        this.authService.setAccessToken(res.accessToken);
        this.authService.setRefreshToken(res.refreshToken);
        this.authService.setUserId(res.userId);
        this.authService.setUserRole(<UserRole><unknown>res.role);

        this.router.navigateByUrl('/dashboard').then(() => this.window.location.reload());
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    })
  }
}
