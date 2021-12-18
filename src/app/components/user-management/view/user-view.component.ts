import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})

/**
 * Component for user view popup
 * @typedef {Component} UserViewComponent
 * @class
 */
export class UserViewComponent implements OnInit {
  public user: User = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    userRole: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
  };

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = params['id'];
      this.getUserData();
    });
  }

  /**
   * Gets user data
   */
  public async getUserData(): Promise<void> {
    //use this.user.id here and set this.user
  }

  /**
   * Opens user edit form
   */
  public openUserEditForm(): void {
  }

  /**
   * Opens user deletion confirmation dialog
   */
  public openUserDeletionDialog(): void {
  }
}
