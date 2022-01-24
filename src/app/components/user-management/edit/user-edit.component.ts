import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";

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
 *
 *
 */
export class UserEditComponent implements OnInit {
  public userEditForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.email,
    ]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role: new FormControl(''),
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

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService : AdminService, public activeModal: NgbActiveModal) {
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

        this.userEditForm.controls['firstname'].setValue(res.firstName);
        this.userEditForm.controls['name'].setValue(res.lastName);
        this.userEditForm.controls['email'].setValue(res.email);
        this.userEditForm.controls['role'].setValue(res.role);
        this.userEditForm.controls['notificationChannel'].setValue(res.notificationChannel);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Changes data of user
   */
  public async editUserData(): Promise<void> {
    //@todo handle edit
    this.activeModal.close('edited');
  }
}
