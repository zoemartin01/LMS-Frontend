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
 * @typedef {Component} RegisterComponent
 * @class
 */
export class RegisterComponent {

  constructor(private userService: UserService) {
  }

  /**
   * Registers user with provided data
   *
   * @param registerForm submitted register form
   */
  public async register(registerForm: NgForm): Promise<void> {
    if (registerForm.valid) {
    }
  }
}
