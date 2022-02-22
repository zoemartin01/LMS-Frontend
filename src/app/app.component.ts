import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WINDOW } from './providers/window.providers';
import { environment } from '../environments/environment';

import { AuthService } from "./services/auth.service";
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
   * @param {Router} router router providing navigation
   * @param {Window} window window provider
   */
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    @Inject(WINDOW) private window: Window) {
    this.websocket = new WebSocket(this.unreadMessagesWebSocketPath());
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
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
  }

  private unreadMessagesWebSocketPath(): string {
    const isSSL = this.window.location.protocol === 'https:';
    const protocol = isSSL ? 'wss:' : 'ws:';
    const host = environment.production
      ? this.window.location.hostname + environment.baseUrl
      : environment.baseUrl.replace(/http(s)?:\/\//g, '');
    const token = localStorage.getItem('accessToken');
    return `${protocol}//${host}${environment.apiRoutes.messages.getCurrentUserUnreadMessagesAmounts}?token=${token}`;
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
