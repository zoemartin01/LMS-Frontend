import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WINDOW } from '../../../providers/window.providers';

import { UserDeleteComponent } from "../../user-management/delete/user-delete.component";

import { UserService } from "../../../services/user.service";
import { UtilityService } from "../../../services/utility.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

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
  public editedUserSettings: boolean = false;
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {Window} window window provider
   */
  constructor(
    public userService: UserService,
    public activeModal: NgbActiveModal,
    public utilityService: UtilityService,
    private modalService: NgbModal,
    @Inject(WINDOW) private window: Window
  ) {
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

    if (!this.checkPasswordConfirmation()) return;

    this.userSettingsForm.controls['password_confirmation'].markAsPristine();

    let changedData = this.utilityService.getDirtyValues(this.userSettingsForm);

    if (this.userSettingsForm.controls['notificationChannel'].dirty) {
      changedData['notificationChannel'] = +changedData['notificationChannel'];
    }

    this.userService.editUserData(changedData).subscribe({
      next: () => {
        this.activeModal.close('edited');
        this.editedUserSettings = true;

        this.window.location.reload();
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      },
    });
  }

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation(): boolean {
    if (!(this.userSettingsForm.value.password === this.userSettingsForm.value.password_confirmation)) {
      this.errorMessage = 'Password confirmation failed!';
      return false;
    }
    return true;
  }
}
