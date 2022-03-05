import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../../services/user.service";
import { UtilityService } from "../../../services/utility.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Component for the register page
 */
export class RegisterComponent {
  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
    safetyInstructions: new FormControl(false, Validators.requiredTrue),
    hwlabRules: new FormControl(false, Validators.requiredTrue),
  });
  errorMessage: string = '';
  passwordConfirmationFails: boolean = false;
  passwordConfirmationFailsMessage: string = 'Password confirmation failed!';

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {Router} router router providing navigation
   */
  constructor(private userService: UserService, public utilityService: UtilityService,
              private router: Router) {
  }

  /**
   * Registers user with provided data
   */
  public async register(): Promise<void> {
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      this.errorMessage = 'You need to fill in all required fields and check all  required checkboxes!'
      return;
    }
    this.userService.register(
      this.registerForm.value.firstname,
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/register/verify-email');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation() {
    this.passwordConfirmationFails = !(this.registerForm.value.password === this.registerForm.value.password_confirmation
      || this.registerForm.value.password_confirmation === '');
  }
}
