import { Component, OnInit } from '@angular/core';

import { UnreadMessages } from "../../types/unread-messages";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  constructor(public authService: AuthService) {
  }

  /**
   * Init page
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
