import { Component, OnInit } from '@angular/core';

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

/**
 * Class for user settings
 * @typedef {Component} UserSettingsComponent
 * @class
 */
export class UserSettingsComponent implements OnInit {
  public emailNotification: boolean|null = null;
  public notificationBox: boolean|null = null;
  public user: User = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    userRole: UserRole.unkown,
  };

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserData();
    //@todo get
  }

  /**
   * Gets user data
   */
  public async getUserData(): Promise<void> {
    //use this.user.id here and set this.user
  }

  /**
   * Changes password
   */
  public async changePassword(): Promise<void>{
  }

  /**
   * Opens user delete confirmation dialog
   */
  public openUserDeletionDialog(): void {
  }

  /**
   * Gets notification channel
   */
  public async getNotificationChannel(): Promise<void>{
  }

  /**
   * Sets notification channel
   */
  public async setNotificationChannel(): Promise<void>{
  }
}
