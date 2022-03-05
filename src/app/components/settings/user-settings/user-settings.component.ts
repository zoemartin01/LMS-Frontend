import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../services/user.service";

import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../../user-management/delete/user-delete.component";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

/**
 * Component for user settings page
 */
export class UserSettingsComponent implements OnInit {
  public userSettingsForm: FormGroup = new FormGroup({
    notificationChannel: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
  });
  public user: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
    emailVerification: true,
    isActiveDirectory: false,
  };
  public passwordConfirmationFails: boolean = false;
  public editedUserSettings: boolean = false;
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public userService: UserService, public activeModal: NgbActiveModal, public utilityService: UtilityService, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Gets user data
   */
  public async getUserData(): Promise<void> {
    this.userService.getUserDetails().subscribe({
      next: res => {
        this.user = res;
        this.userSettingsForm.controls['notificationChannel'].setValue(
          this.user.notificationChannel
        );
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens user deletion confirmation dialog
   */
  public openUserDeletionDialog(): void {
    const modal = this.modalService.open(UserDeleteComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUserData();
      }
    });
  }

  /**
   * Edits user settings
   */
  public async editUserSettings(): Promise<void> {
    this.errorMessage = '';
    this.editedUserSettings = false;
    if (this.userSettingsForm.controls['password'].value != "") {
      this.userService.editUserData(
        {
          notificationChannel: +this.userSettingsForm.controls['notificationChannel'].value,
          password: this.userSettingsForm.controls['password'].value,
        }
      ).subscribe({
        next: () => {
          this.activeModal.close('edited');
          this.editedUserSettings = true;
        },
        error: error => {
          console.error('There was an error!', error);
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      });
      return;
    }

    this.userService.editUserData(
      {notificationChannel: +this.userSettingsForm.controls['notificationChannel'].value}
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
        this.editedUserSettings = true;
      },
      error: error => {
        console.error('There was an error!', error);
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation() {
    this.passwordConfirmationFails = !(this.userSettingsForm.value.password === this.userSettingsForm.value.password_confirmation)
  }
}
