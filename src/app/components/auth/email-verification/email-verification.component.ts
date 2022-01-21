import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})

/**
 * Component for the email verification page
 */
export class EmailVerificationComponent implements OnInit {
  public verifyForm: FormGroup = this.formBuilder.group({
    userId: '',
    token: '',
  });
  public showForm: boolean = false;
  public verifyEmailError: boolean = false;
  public verifyEmailErrorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {Router} router angular router
   * @param {FormBuilder} formBuilder angular form builder
   */
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['userId'] !== undefined && params['token'] !== undefined) {
        this.verifyForm.controls['userId'].setValue(params['userId']);
        this.verifyForm.controls['token'].setValue(params['token']);

        this.verifyEmail();
      } else {
        this.showForm = true;
      }
    });
  }

  /**
   * Verifies user's email with provided data
   */
  public async verifyEmail(): Promise<void> {
    this.showForm = false;

    if (this.verifyForm.valid) {
      this.userService.verifyEmail(
        this.verifyForm.value.userId,
        this.verifyForm.value.token
      ).subscribe({
        next: () => {
          this.router.parseUrl('/login');
        },
        error: error => {
          this.verifyEmailError = true;
          this.verifyEmailErrorMessage = error;
          this.showForm = true;
          console.error('There was an error!', error);
        }
      });
    }
  }
}
