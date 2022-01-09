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
 *
 *
 */
export class MessageBoxComponent implements OnInit {
  public messages: Message[] = [];
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    orders: 0,
    users: 0,
  };

  /**
   * Constructor
   * @constructor
   * @param {MessagingService} messagingService service providing messaging functionalities
   */
  constructor(public messagingService: MessagingService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.updatePage();
  }

  /**
   * Updates page
   * @private
   */
  private updatePage() {
    this.getUnreadMessagesAmounts();
    this.getMessages();
  }

  /**
   * Retrieves all messages for current user
   */
  public async getMessages(): Promise<void> {
    this.messagingService.getMessages().subscribe({
      next: (res: Message[]) => {
        this.messages = res;
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
   * Opens message deletion dialog
   *
   * @param {MessageId} messageId id of message to be deleted
   */
  public async openAppointmentDeletionDialog(messageId: MessageId): Promise<void> {
    //@todo Adrian: implement deletion dialog
  }

  /**
   * Marks specified message as read
   *
   * @param {MessageId} messageId id of message to be marked as read
   */
  public async markMessageAsRead(messageId: MessageId): Promise<void> {
    this.messagingService.markMessageAsRead(messageId).subscribe({
      next: () => {
        this.updatePage()
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Marks specified message as unread
   *
   * @param {MessageId} messageId id of message to be marked as read
   */
  public async markMessageAsUnread(messageId: MessageId): Promise<void> {
    this.messagingService.markMessageAsUnread(messageId).subscribe({
      next: () => {
        this.updatePage()
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
