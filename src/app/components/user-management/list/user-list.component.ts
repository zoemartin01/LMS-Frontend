import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminService} from "../../../services/admin.service";
import {UserService} from "../../../services/user.service";

import {UserAcceptComponent} from "../accept/user-accept.component";
import {UserDeclineComponent} from "../decline/user-decline.component";
import {UserDeleteComponent} from "../delete/user-delete.component";
import {UserEditComponent} from "../edit/user-edit.component";
import {UserViewComponent} from "../view/user-view.component";

import {User} from "../../../types/user";
import {UserId} from "../../../types/aliases/user-id";
import {UserRole} from "../../../types/enums/user-role";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

/**
 * Component for a list of all users
 *
 *
 */
export class UserListComponent implements OnInit {
  public pendingUsers: User[] = [];
  public acceptedUsers: User[] = [];

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {UserService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public userService: UserService, public adminService: AdminService, public authService: AuthService, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Gets data of all users
   */
  public async getUsers(): Promise<void> {
    this.adminService.getUsers().subscribe({
      next: res => {
        this.pendingUsers = res.filter((user: User) => user.role == UserRole.pending && user.emailVerification);
        this.acceptedUsers = res.filter((user: User) => user.role != UserRole.pending && user.emailVerification);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Opens user accept confirmation dialog
   *
   * @param {userId} userId id of user to accept
   */
  public openUserAcceptDialog(userId: UserId): void {
    const modal = this.modalService.open(UserAcceptComponent);
    modal.componentInstance.user.id = userId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUsers();
      }
    });
  }

  /**
   * Opens user decline confirmation dialog
   *
   * @param {userId} userId id of pending user
   */
  public async openUserDeclineUser(userId: UserId): Promise<void> {
    const modal = this.modalService.open(UserDeclineComponent);
    modal.componentInstance.user.id = userId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUsers();
      }
    });
  }

  /**
   * Opens user view
   *
   * @param {userId} userId id of user to view
   */
  public openUserView(userId: UserId): void {
    const modal = this.modalService.open(UserViewComponent);
    modal.componentInstance.user.id = userId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUsers();
      }
    });
  }

  /**
   * Opens user edit form
   *
   * @param {userId} userId id of user to edit
   */
  public openUserEditForm(userId: UserId): void {
    const modal = this.modalService.open(UserEditComponent);
    modal.componentInstance.user.id = userId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUsers();
      }
    });
  }

  /**
   * Opens user deletion confirmation dialog
   *
   * @param {userId} userId id of user to delete
   */
  public openUserDeletionDialog(userId: UserId): void {
    const modal = this.modalService.open(UserDeleteComponent);
    modal.componentInstance.user.id = userId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getUsers();
      }
    });
  }
}
