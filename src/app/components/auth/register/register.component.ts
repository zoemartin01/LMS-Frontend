import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Component for the register page
 *
 *
 */
export class RegisterComponent {
  registerError: boolean = false;
  registerErrorMessage: string = '';
  passwordConfirmationFails: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {Router} router router providing navigation
   */
  constructor(private userService: UserService, private router: Router) {
  }

  /**
   * Registers user with provided data
   *
   * @param {NgForm} registerForm submitted register form
   */
  public async register(registerForm: NgForm): Promise<void> {
    if (registerForm.valid) {
      this.userService.register(
        registerForm.value.firstname,
        registerForm.value.name,
        registerForm.value.email,
        registerForm.value.password
      ).subscribe({
        next: () => {
          this.router.navigate(['/register/verify-email']);
        },
        error: error => {
          this.registerError = true;
          this.registerErrorMessage = error;
          console.error('There was an error!', error);
        }
      })
    }
  }

  checkPasswordConfirmation(registerForm: NgForm) {
    this.passwordConfirmationFails = !(registerForm.value.password === registerForm.value.password_confirmation
      || registerForm.value.password_confirmation === '');
  }
}
