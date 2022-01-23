import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

/**
 * Component for user settings page
 *
 *
 */
export class UserSettingsComponent implements OnInit {
  public emailNotification: boolean|null = null;
  public notificationBox: boolean|null = null;
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

  /**
   * Constructor
   * @constructor
   * @param {UserService} userService service providing user functionalities
   */
  constructor(public userService: UserService) {
  }

  /**
   * Inits page
   */
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
   * Opens user deletion confirmation dialog
   */
  public openUserDeletionDialog(): void {
  }

  /**
   * Sets notification channel
   */
  public async setNotificationChannel(): Promise<void>{
  }
}
