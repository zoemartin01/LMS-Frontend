import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { interval, startWith, switchMap } from "rxjs";

import { AuthService } from "./services/auth.service";
import { MessagingService } from "./services/messaging.service";
import { UserService } from "./services/user.service";

import { User } from "./types/user";
import { UnreadMessages } from "./types/unread-messages";
import { NotificationChannel } from "./types/enums/notification-channel";
import { environment } from 'src/environments/environment';
import { WINDOW } from './providers/window.providers';

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
    private router: Router,
    @Inject(WINDOW) private window: Window) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      const ws = new WebSocket(this.unreadMessagesWebSocketPath());

      ws.onmessage = (event) => {
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
