import { Component, OnInit } from '@angular/core';

import { UnreadMessages } from "../../../types/unread-messages";

import { AuthService } from "../../../services/auth.service";
import { MessagingService } from "../../../services/messaging.service";

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

  /**
   * Constructor
   * @param {AuthService} authService service providing appointment functionalities
   * @param {MessagingService} messagingService service providing messaging functionalities
   */
  constructor(public authService: AuthService, public messagingService: MessagingService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getUnreadMessagesAmounts();
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public async getUnreadMessagesAmounts(): Promise<void>{
  }
}
