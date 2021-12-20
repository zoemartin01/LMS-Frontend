import { Component, OnInit } from '@angular/core';

import { AuthService } from "./services/auth.service";

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
  title = 'frontend';
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  /**
   * Constructor
   * @param {AuthService} authService service providing appointment functionalities
   */
  constructor(public authService: AuthService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.unreadMessages = {
      sum: 7,
      appointments: 2,
      orders: 3,
      users: 1,
    };
  }
}
