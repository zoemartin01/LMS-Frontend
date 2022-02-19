import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { MessageDeleteComponent } from "./delete/message-delete.component";

import { AuthService } from "../../../services/auth.service";
import { MessagingService } from "../../../services/messaging.service";
import { UserService } from "../../../services/user.service";

import { Message } from "../../../types/message";
import { MessageId } from "../../../types/aliases/message-id";
import { UnreadMessages } from "../../../types/unread-messages";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { PagedResponse } from 'src/app/types/paged-response';
import { PagedList } from 'src/app/types/paged-list';

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
  public messages: PagedList<Message> = new PagedList<Message>();
  public unreadMessages: UnreadMessages = {
    sum: 0,
    appointments: 0,
    appointments_admin: 0,
    orders: 0,
    orders_admin: 0,
    users: 0,
    settings: 0,
  };

  /**
   * Constructor
   * @constructor
   * @param {MessagingService} messagingService service providing messaging functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {Router} router router providing navigation
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public messagingService: MessagingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.messages.pageSize = 8;
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        const notificationChannel = res.notificationChannel;
        if (notificationChannel !== NotificationChannel.emailAndMessageBox
          && notificationChannel !== NotificationChannel.messageBoxOnly) {
          this.router.navigateByUrl('/dashboard');
          return;
        }

        this.updatePage();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Updates page
   * @private
   */
  public updatePage() {
    this.getUnreadMessagesAmounts();
    this.getMessages();
  }

  /**
   * Retrieves all messages for current user
   */
  public async getMessages(page: number = this.messages.page): Promise<void> {
    const pageSize = this.messages.pageSize;
    const offset = (page - 1) * pageSize;

    this.messagingService.getMessages(pageSize, offset).subscribe({
      next: (res: PagedResponse<Message>) => {
        this.messages.parse(res, page);
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
   * @param {Message} message message to be deleted
   */
  public async openMessageDeletionDialog(message: Message): Promise<void> {
    const modal = this.modalService.open(MessageDeleteComponent);
    modal.componentInstance.message = message;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getMessages();
      }
    });
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

  /**
   * Goes to the corresponding page of the specified message and marks it as read
   *
   * @param {string} url url to go to
   */
  public goToCorrespondingPage(message: Message): void {
    if (message.correspondingUrl !== null) {
      this.markMessageAsRead(message.id);
      this.router.navigateByUrl(message.correspondingUrl);
    }
  }
}
