import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '../../../providers/window.providers';

import { AuthService } from "../../../services/auth.service";
import { MessagingService } from "../../../services/messaging.service";
import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UnreadMessages } from "../../../types/unread-messages";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Component for the dashboard page
 * @typedef {Component} DashboardComponent
 * @class
 */
export class DashboardComponent implements OnInit {
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    appointments_admin: 0,
    orders: 0,
    orders_admin: 0,
    users: 0,
    settings: 0,
  };
  public showMessageBox: boolean = false;
  public websocket: WebSocket;

  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing authentication functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {MessagingService} messagingService service providing messaging functionalities
   * @param {Window} window window provider
   */
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private messagingService: MessagingService,
    @Inject(WINDOW) private window: Window) {
    this.websocket = new WebSocket(messagingService.unreadMessagesWebSocketPath());
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.unreadMessages = data;
      } catch (err) {
        // ignore
      }
    };

    this.getUserDetails();
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
}
