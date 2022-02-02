import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { interval, startWith, switchMap } from "rxjs";

import { AuthService } from "./services/auth.service";
import { MessagingService } from "./services/messaging.service";
import { UserService } from "./services/user.service";

import { User } from "./types/user";
import { UnreadMessages } from "./types/unread-messages";
import { NotificationChannel } from "./types/enums/notification-channel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Component for application layout
 * @typedef {Component} AppComponent
 * @class
 */
export class AppComponent implements OnInit {
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
    public authService: AuthService,
    public messagingService: MessagingService,
    private userService: UserService,
    private router: Router) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.getUnreadMessagesAmounts();

      //polling unread messages amount
      setInterval(() => {
        if (!this.authService.isUserLoggedIn()) {
          clearInterval();
        }

        this.getUnreadMessagesAmounts();
      }, 5000);

      this.getUserDetails();
    }
  }

  /**
   * Retrieves details for current user
   */
  public async getUserDetails(): Promise<void>{
    this.userService.getUserDetails().subscribe({
      next: (res: User) => {
        const notificationChannel: NotificationChannel = res.notificationChannel;
        this.showMessageBox = (notificationChannel === NotificationChannel.emailAndMessageBox
          || notificationChannel === NotificationChannel.messageBoxOnly);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public async getUnreadMessagesAmounts(): Promise<void>{
    this.messagingService.getUnreadMessagesAmounts().subscribe({
      next: (res: UnreadMessages) => {
        this.unreadMessages = res;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Triggers logout of user
   */
  public async logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigateByUrl('/');
      },
      error: error => {
        console.error('There was an error!', error);

        localStorage.clear();
        this.router.navigateByUrl('/');
      }
    });
  }
}
