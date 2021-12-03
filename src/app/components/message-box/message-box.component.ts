import { Component, OnInit } from '@angular/core';

import { Message } from "../../types/message";
import {UnreadMessages} from "../../types/unread-messages";

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

  ngOnInit(): void {
  }

  public deleteMessage(messageId: number): void {
  }

  public markMessageAsRead(messageId: number): void {
  }
}
