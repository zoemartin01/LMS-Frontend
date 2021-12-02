import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { lastValueFrom } from "rxjs";

import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Login user with provided credentials
   *
   * @param authForm submitted login form
   */
  public async login(authForm: NgForm): Promise<void> {
    if (authForm.valid) {
      this.authService.login(authForm.value.email, authForm.value.password).subscribe({
        next: (res: {accessToken: string, refreshToken: string, role: string}) => {
          this.authService.setAccessToken(res.accessToken);
          this.authService.setRefreshToken(res.refreshToken);
          this.authService.setUserRole(res.role);

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
