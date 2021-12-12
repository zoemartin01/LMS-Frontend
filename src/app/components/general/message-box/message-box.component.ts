import { Component, OnInit } from '@angular/core';

import { MessagingService } from "../../../services/messaging.service";

import { Message } from "../../../types/message";
import { MessageId } from "../../../types/aliases/message-id";
import { UnreadMessages } from "../../../types/unread-messages";

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})

/**
 * Component for the message box page
 */
export class MessageBoxComponent implements OnInit {
  public messages: Message[] = [];
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  constructor(public messagingService: MessagingService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getUnreadMessagesAmounts();
    this.getMessages();
  }

  /**
   * Retrieves all messages for current user
   */
  public async getMessages(): Promise<void> {
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public async getUnreadMessagesAmounts(): Promise<void>{
  }

  /**
   * Deletes specified message
   *
   * @param {MessageId} messageId id of message to be deleted
   */
  public async deleteMessage(messageId: MessageId): Promise<void> {
  }

  /**
   * Marks specified message as read
   *
   * @param {MessageId} messageId id of message to be marked as read
   */
  public async markMessageAsRead(messageId: MessageId): Promise<void> {
  }
}
