import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
    ]),
    safetyInstructions: new FormControl(false, [
      Validators.requiredTrue,
    ]),
    hwlabRules: new FormControl(false, [
      Validators.requiredTrue,
    ]),
  });
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
   */
  public async register(): Promise<void> {
    if (this.registerForm.valid) {
      this.userService.register(
        this.registerForm.value.firstname,
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password
      ).subscribe({
        next: () => {
          this.registerError = false;
          this.registerErrorMessage = '';
          this.router.navigateByUrl('/register/verify-email');
        },
        error: error => {
          this.registerError = true;
          this.registerErrorMessage = error.error.message;
          console.error('There was an error!', error);
        }
      })
    } else {
      this.registerError = true;
      this.registerErrorMessage = 'Invalid form values';
    }
  }

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation() {
    this.passwordConfirmationFails = !(this.registerForm.value.password === this.registerForm.value.password_confirmation
      || this.registerForm.value.password_confirmation === '');
  }
}
