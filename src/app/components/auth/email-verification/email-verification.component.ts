import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

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
export class EmailVerificationComponent implements OnInit {
  public showForm: boolean = false;


  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {Router} router angular router
   */
  constructor(private userService: UserService,  private route: ActivatedRoute, private router: Router) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.showForm = (params['userId'] === undefined || params['token'] === undefined);

      if (!this.showForm) {
        this.verifyEmail(params['userId'], params['token']);
      }
    });
  }

  /**
   * Verifies user's email with provided data
   *
   * @param {NgForm} verifyForm submitted verification form
   */
  public async handleVerificationForm(verifyForm: NgForm): Promise<void> {
    if (verifyForm.valid) {
      //@todo Mario: implement
    }
  }

  /**
   * Verifies user's email with provided data
   *
   * @param {string} userId user's id
   * @param {string} token  token to verify email
   */
  public async verifyEmail(userId: string, token: string): Promise<void> {
    await this.userService.verifyEmail(userId, token);
    await this.router.parseUrl('/login');
  }
}
