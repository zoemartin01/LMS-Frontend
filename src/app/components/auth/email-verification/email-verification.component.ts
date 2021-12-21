import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})

/**
 * Component for the email verification page
 *
 *
 */
export class EmailVerificationComponent {

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   */
  constructor(private userService: UserService) {
  }

  /**
   * Verifies user's email with provided data
   *
   * @param {NgForm} verifyForm submitted verification form
   */
  public async verifyEmail(verifyForm: NgForm): Promise<void> {
    if (verifyForm.valid) {
    }
  }
}
