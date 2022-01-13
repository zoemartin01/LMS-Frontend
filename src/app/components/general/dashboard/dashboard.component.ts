import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth.service";
import { MessagingService } from "../../../services/messaging.service";
import { UserService } from "../../../services/user.service";

import { UnreadMessages } from "../../../types/unread-messages";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Component for the dashboard page
 *
 *
 */
export class DashboardComponent implements OnInit {
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };
  public showMessageBox: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing authentication functionalities
   * @param {MessagingService} messagingService service providing messaging functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {Router} router router providing navigation
   */
  constructor(
    private authService: AuthService,
    public messagingService: MessagingService,
    private userService: UserService,
    private router: Router
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUnreadMessagesAmounts();

    this.userService.getUserDetails(this.authService.getUserId()).subscribe({
      next: (res) => {
        const notificationChannel = res.notificationChannel;
        this.showMessageBox = (notificationChannel === NotificationChannel.emailAndMessageBox
          || notificationChannel === NotificationChannel.messageBoxOnly);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public async getUnreadMessagesAmounts(): Promise<void>{
    this.messagingService.getUnreadMessagesAmounts().subscribe({
      next: res => {
        this.unreadMessages = res;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
