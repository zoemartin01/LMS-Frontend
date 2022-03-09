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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role: new FormControl(0),
    notificationChannel: new FormControl(''),
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
  public UserRole = UserRole;
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public utilityService: UtilityService,
    public adminService: AdminService,
    public activeModal: NgbActiveModal
  ) {
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
        this.user = res;

        this.userEditForm.controls['firstName'].setValue(this.user.firstName);
        this.userEditForm.controls['lastName'].setValue(this.user.lastName);
        this.userEditForm.controls['email'].setValue(this.user.email);
        this.userEditForm.controls['role'].setValue(this.user.role);
        this.userEditForm.controls['notificationChannel'].setValue(this.user.notificationChannel);
      },
      error: error => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Changes data of user
   */
  public async editUserData(): Promise<void> {
    this.errorMessage = '';

    if (this.userEditForm.invalid) {
      this.errorMessage = 'You need to fill in all required fields!';
      return;
    }

    if (!this.checkPasswordConfirmation()) return;

    this.userEditForm.controls['password_confirmation'].markAsPristine();

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
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      },
    });
  }

  /**
   * Checks if password and password confirmation match
   */
  public checkPasswordConfirmation(): boolean {
    if (!(this.userEditForm.value.password === this.userEditForm.value.password_confirmation)) {
      this.errorMessage = 'Password confirmation failed!';
      return false;
    }
    return true;
  }
}
