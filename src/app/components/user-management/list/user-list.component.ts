import { Component, OnInit } from '@angular/core';

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

/**
 * Class for a list of all users
 * @typedef {Component} UserListComponent
 * @class
 */
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
   * Opens user delete confirmation dialog
   *
   * @param {userId} userId id of user to delete
   */
  public openUserDeletionDialog(userId: UserId): void {
  }
}
