import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

import { User } from "../../types/user";

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
  public async acceptPendingUser(): Promise<void> {
  }

  /**
   * Denies pending user
   */
  public async denyPendingUser(): Promise<void> {
  }

  /**
   * Deletes user
   */
  public async deleteUser(): Promise<void> {
  }
}
