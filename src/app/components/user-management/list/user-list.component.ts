import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Gets data of all users
    */
  public async getUsers(): Promise<void> {
  }

  /**
   * Accepts pending user
   *
   * @param userId id of pending user
   */
  public async acceptPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Denies pending user
   *
   * @param userId id of pending user
   */
  public async denyPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Opens user view
   *
   * @param userId id of user to view
   */
  public openUserView(userId: UserId): void {
  }

  /**
   * Opens user edit form
   *
   * @param userId id of user to edit
   */
  public openUserEditForm(userId: UserId): void {
  }

  /**
   * Opens user delete confirmation dialog
   *
   * @param userId id of user to delete
   */
  public openUserDeletionDialog(userId: UserId): void {
  }
}
