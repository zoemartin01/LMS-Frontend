import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Verify user's email with provided data
   *
   * @param verifyForm submitted register form
   */
  public async verifyEmail(verifyForm: NgForm): Promise<void> {
    if (verifyForm.valid) {
    }
  }
}
