import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

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

  /**
   * Constructor
   * @param {UserService} userService service providing user functionalities
   */
  constructor(private userService: UserService) {
  }

  /**
   * Registers user with provided data
   *
   * @param {NgForm} registerForm submitted register form
   */
  public async register(registerForm: NgForm): Promise<void> {
    if (registerForm.valid) {
    }
  }
}
