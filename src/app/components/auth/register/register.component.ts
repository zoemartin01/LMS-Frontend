import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
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
  public registerForm: FormGroup = this.formBuilder.group({
    firstname: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    safetyInstructions: false,
    hwlabRules: false,
  });
  registerError: boolean = false;
  registerErrorMessage: string = '';
  passwordConfirmationFails: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {Router} router router providing navigation
   * @param {FormBuilder} formBuilder angular form builder
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) {
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

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation() {
    this.passwordConfirmationFails = !(this.registerForm.value.password === this.registerForm.value.password_confirmation
      || this.registerForm.value.password_confirmation === '');
  }
}
