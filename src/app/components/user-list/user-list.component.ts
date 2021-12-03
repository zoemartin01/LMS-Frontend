import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

import { User } from "../../types/user";
import { UserId } from "../../types/aliases/user-id";

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
  }

  /**
   * Gets user data (including: mail adress, name, role, e-mail verification status)
    */
  public async getUsers(): Promise<void> {
  }

  /**
   * Accepts pending user
   */
  public async acceptPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Denies pending user
   */
  public async denyPendingUser(userId: UserId): Promise<void> {
  }

  /**
   * Deletes user
   */
  public async deleteUser(userId: UserId): Promise<void> {
  }
}
