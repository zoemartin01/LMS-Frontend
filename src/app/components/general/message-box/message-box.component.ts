import { Component, OnInit } from '@angular/core';

import { Message } from "../../../types/message";
import { UnreadMessages } from "../../../types/unread-messages";

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  public messages: Message[] = [];
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  constructor() {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Delete message
   *
   * @param messageId id of message to be deleted
   */
  public deleteMessage(messageId: number): void {
  }

  /**
   * Mark specified message as read
   *
   * @param messageId id of message to be marked as read
   */
  public markMessageAsRead(messageId: number): void {
  }
}
