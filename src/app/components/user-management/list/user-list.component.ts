import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from "../../../services/admin.service";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

import { UserAcceptComponent } from "../accept/user-accept.component";
import { UserDeclineComponent } from "../decline/user-decline.component";
import { UserDeleteComponent } from "../delete/user-delete.component";
import { UserEditComponent } from "../edit/user-edit.component";
import { UserViewComponent } from "../view/user-view.component";

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";
import { PagedList } from "../../../types/paged-list";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

/**
 * Component for a list of all users
 */
export class UserListComponent implements OnInit {
  public pendingUsers: PagedList<User> = new PagedList<User>();
  public acceptedUsers: PagedList<User> = new PagedList<User>();

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {UserService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public userService: UserService,
    public adminService: AdminService,
    public authService: AuthService,
    private modalService: NgbModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAcceptedUsers(this.acceptedUsers.page);
    this.getPendingUsers(this.pendingUsers.page);
  }

  /**
   * Gets data of all pending users
   *
   * @param {number} page number of current page
   */
  public async getPendingUsers(page: number = this.pendingUsers.page): Promise<void> {
    const pageSize = this.pendingUsers.pageSize;
    const offset = (page - 1) * pageSize;
    this.adminService.getPendingUsers(pageSize, offset).subscribe({
      next: res => {
        this.pendingUsers.total = res.total;
        this.pendingUsers.page = page;

        this.pendingUsers.data = res.data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets data of all accepted users
   *
   * @param {number} page number of current page
   */
  public async getAcceptedUsers(page: number = this.acceptedUsers.page): Promise<void> {
    const pageSize = this.pendingUsers.pageSize;
    const offset = (page - 1) * pageSize;
    this.adminService.getAcceptedUsers(pageSize, offset).subscribe({
      next: res => {
        this.acceptedUsers.total = res.total;
        this.acceptedUsers.page = page;

        this.acceptedUsers.data = res.data;
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
        this.getPendingUsers(this.pendingUsers.page);
        this.getAcceptedUsers(this.acceptedUsers.page);
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
        this.getPendingUsers(this.pendingUsers.page);
        this.getAcceptedUsers(this.acceptedUsers.page);
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
        this.getAcceptedUsers(this.acceptedUsers.page);
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
        this.getAcceptedUsers(this.acceptedUsers.page);
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
        this.getAcceptedUsers(this.acceptedUsers.page);
      }
    });
  }
}
