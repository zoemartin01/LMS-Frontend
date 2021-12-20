import { Component, OnInit } from '@angular/core';

import { AdminService } from "../../../services/admin.service";

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

/**
 * Component for a list of all users
 * @typedef {Component} UserListComponent
 * @class
 */
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(public adminService: AdminService) {
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
