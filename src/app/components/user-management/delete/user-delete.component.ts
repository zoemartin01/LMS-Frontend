import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminService} from "../../../services/admin.service";

import {User} from "../../../types/user";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";

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
    email: new FormControl('', [
      Validators.email,
    ]),
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
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal) {
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

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
    this.adminService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.adminService.getUsers();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.activeModal.close('deleted');
    //@TODO close user view popup
  }
}
