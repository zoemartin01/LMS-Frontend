import { Component, OnInit } from '@angular/core';

import { AdminService } from "../../../services/admin.service";
import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";
import { UserRole } from "../../../types/enums/user-role";

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
   */
  constructor(public adminService: AdminService, public userService: UserService) {
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
        this.pendingUsers = res.filter((user: User) => user.userRole == UserRole.pending);
        this.acceptedUsers = res.filter((user: User) => user.userRole != UserRole.pending);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Accepts pending user
   *
   * @param {userId} userId id of pending user
   */
  public async acceptPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Denies pending user
   *
   * @param {userId} userId id of pending user
   */
  public async denyPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Opens user view
   *
   * @param {userId} userId id of user to view
   */
  public openUserView(userId: UserId): void {
  }

  /**
   * Opens user edit form
   *
   * @param {userId} userId id of user to edit
   */
  public openUserEditForm(userId: UserId): void {
  }

  /**
   * Opens user deletion confirmation dialog
   *
   * @param {userId} userId id of user to delete
   */
  public openUserDeletionDialog(userId: UserId): void {
  }
}
