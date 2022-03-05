import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})

/**
 * Component for the deletion of a user
 */
export class UserDeleteComponent implements OnInit {
  public userDeleteForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    notificationChannel: new FormControl(''),
  });
  public user: User = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
    emailVerification: true,
    isActiveDirectory: false,
  }
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {Router} router router providing navigation
   * @param {AuthService} authService service providing authentication functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public router: Router,
              public authService: AuthService,
              public userService: UserService,
              public adminService: AdminService,
              public utilityService: UtilityService,
              public activeModal: NgbActiveModal) {
    this.userDeleteForm.disable();
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
    if (this.user.id != null) {
      this.adminService.getUser(this.user.id).subscribe({
        next: res => {
          this.user = res;

          this.userDeleteForm.controls['firstName'].setValue(res.firstName);
          this.userDeleteForm.controls['lastName'].setValue(res.lastName);
          this.userDeleteForm.controls['email'].setValue(res.email);
          this.userDeleteForm.controls['role'].setValue(res.role);
          this.userDeleteForm.controls['notificationChannel'].setValue(res.notificationChannel);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    } else {
      this.userService.getUserDetails().subscribe({
        next: res => {
          this.user = res;

          this.userDeleteForm.controls['firstName'].setValue(res.firstName);
          this.userDeleteForm.controls['lastName'].setValue(res.lastName);
          this.userDeleteForm.controls['email'].setValue(res.email);
          this.userDeleteForm.controls['role'].setValue(res.role);
          this.userDeleteForm.controls['notificationChannel'].setValue(res.notificationChannel);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
    this.errorMessage = '';
    if (this.user.id != null && this.user.id != this.authService.getUserId()) {
      this.adminService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.activeModal.close('deleted');
        },
        error: error => {
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      });
      return;
    } else {
      this.userService.deleteUser().subscribe({
        next: () => {
          this.activeModal.close('deleted');
          this.router.navigateByUrl("/");
          localStorage.clear();
        },
        error: error => {
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        }
      });
    }
  }
}
