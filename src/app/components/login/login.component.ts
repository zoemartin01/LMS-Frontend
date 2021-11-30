import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }



  public async submit(authForm: any) {
    if (authForm.valid) {
      const res: {accessToken: string, refreshToken: string, role: string} = await lastValueFrom(
        this.authService.login(authForm.value.email, authForm.value.password)
      );

      this.authService.setAccessToken(res.accessToken);
      this.authService.setRefreshToken(res.refreshToken);
      this.authService.setUserRole(res.role);
    }
  }
}
