import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";
import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

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
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
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

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public userService : UserService, public adminService: AdminService, public activeModal: NgbActiveModal) {
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
    }
  }

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
    if (this.user.id != null) {
      this.adminService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.activeModal.close('deleted');
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
      return;
    }
    this.userService.deleteUser().subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
