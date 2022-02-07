import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";
import { UtilityService } from "../../../services/utility.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

/**
 * Component for user edit popup
 */
export class UserEditComponent implements OnInit {
  public userEditForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [
      Validators.email,
    ]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role: new FormControl(0),
    notificationChannel: new FormControl(''),
  });
  registerError: boolean = false;
  registerErrorMessage: string = '';
  passwordConfirmationFails: boolean = false;
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
  public UserRole = UserRole;

  /**
   * Constructor
   * @constructor
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public utilityService: UtilityService, public adminService: AdminService, public activeModal: NgbActiveModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Gets data of user
   */
  public async getUserData(): Promise<void> {
    this.adminService.getUser(this.user.id).subscribe({
      next: res => {
        this.updateUserEditForm(res);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Helper method to update the user edit form
   *
   * @param  {User} user user to be edited
   * @private
   */
  private updateUserEditForm(user: User) {
    this.user = user;

    this.userEditForm.controls['firstName'].setValue(user.firstName);
    this.userEditForm.controls['lastName'].setValue(user.lastName);
    this.userEditForm.controls['email'].setValue(user.email);
    this.userEditForm.controls['role'].setValue(user.role);
    this.userEditForm.controls['notificationChannel'].setValue(user.notificationChannel);
  }

  /**
   * Changes data of user
   */
  public async editUserData(): Promise<void> {
    let changedData = this.utilityService.getDirtyValues(this.userEditForm);

    if (this.userEditForm.controls['role'].dirty) {
      changedData['role'] = +changedData['role'];
    }

    if (this.userEditForm.controls['notificationChannel'].dirty) {
      changedData['notificationChannel'] = +changedData['notificationChannel'];
    }

    this.adminService.updateUser(this.user.id, changedData).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
