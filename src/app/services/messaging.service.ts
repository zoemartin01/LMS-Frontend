import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Message } from "../types/message";
import { UserId } from "../types/aliases/user-id";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all messages for current user
   */
  public getMessages(): Observable<any> {
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public getUnreadMessagesAmounts(): Observable<any> {
  }

  /**
   * Sends a message to another user
   *
   * @param recipient recipient of the message
   * @param message   contents of the message
   */
  public sendMessage(recipient: UserId, message: Message): Observable<any> {
  }

  /**
   * Deletes a message from database
   *
   * @param messageId id of concerned message
   */
  public deleteMessage(messageId: number): Observable<any> {
  }

  /**
   * Marks a message as read
   *
   * @param messageId id of concerned message
   */
  public markMessageAsRead(messageId: number): Observable<any> {
  }
}
