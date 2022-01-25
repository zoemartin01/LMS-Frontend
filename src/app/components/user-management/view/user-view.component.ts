import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";

import { UserDeleteComponent } from "../delete/user-delete.component";
import { UserEditComponent } from "../edit/user-edit.component";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})

/**
 * Component for user view popup
 *
 *
 */
export class UserViewComponent implements OnInit {
  public userViewForm: FormGroup = new FormGroup({
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
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
    this.userViewForm.disable();
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

        this.userViewForm.controls['firstname'].setValue(res.firstName);
        this.userViewForm.controls['name'].setValue(res.lastName);
        this.userViewForm.controls['email'].setValue(res.email);
        this.userViewForm.controls['role'].setValue(res.role);
        this.userViewForm.controls['notificationChannel'].setValue(res.notificationChannel);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens user edit form
   */
  public openUserEditForm(): void {
    const modal = this.modalService.open(UserEditComponent);
    modal.componentInstance.user.id = this.user.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUserData();
      }
    });
  }

  /**
   * Opens user deletion confirmation dialog
   */
  public openUserDeletionDialog(): void {
    const modal = this.modalService.open(UserDeleteComponent);
    modal.componentInstance.user.id = this.user.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUserData();
        this.dirty = true;
      }
    });
  }
}
