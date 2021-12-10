import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { MessageId } from "../types/aliases/message-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides API access for message system
 */
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
   * Deletes a message from database
   *
   * @param messageId id of concerned message
   */
  public deleteMessage(messageId: MessageId): Observable<any> {
  }

  /**
   * Marks a message as read
   *
   * @param messageId id of concerned message
   */
  public markMessageAsRead(messageId: MessageId): Observable<any> {
  }
}
