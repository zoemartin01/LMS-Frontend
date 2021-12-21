import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../../../services/auth.service";

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
   * @param
   */
  constructor() {
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
