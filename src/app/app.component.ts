import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "./services/auth.service";
import { MessagingService } from "./services/messaging.service";

import { UnreadMessages } from "./types/unread-messages";

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

  /**
   * Constructor
   * @constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {MessagingService} messagingService service providing messaging functionalities
   * @param {Router} router router providing navigation
   */
  constructor(public authService: AuthService, private messagingService: MessagingService, private router: Router) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.getUnreadMessagesAmounts();
    }
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

  /**
   * Triggers logout of user
   */
  public async logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();

        this.router.navigate(['/']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
