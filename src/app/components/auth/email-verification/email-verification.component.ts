import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {UserService} from "../../../services/user.service";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})

/**
 * Component for the email verification page
 */
export class EmailVerificationComponent implements OnInit {
  public verifyForm: FormGroup = new FormGroup({
    userId: new FormControl('', [
      Validators.required,
    ]),
    token: new FormControl('', [
      Validators.required,
    ]),
  });
  public showForm: boolean = false;
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {Router} router angular router
   */
  constructor(
    private userService: UserService,
    public utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router) {
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
    this.errorMessage = '';
    this.showForm = false;
    if (this.verifyForm.invalid) {
      this.errorMessage = 'You need to fill in all required fields!'
      this.showForm = true;
      return;
    }
    this.userService.verifyEmail(
      this.verifyForm.value.userId,
      this.verifyForm.value.token
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
        this.showForm = true;
      }
    });

  }
}
