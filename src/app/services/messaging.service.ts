import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { MessageId } from "../types/aliases/message-id";

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides API access for message system
 * @typedef {Service} MessagingService
 * @class
 */
export class MessagingService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all messages for current user
   */
  public getMessages(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.getCurrentUserMessages}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public getUnreadMessagesAmounts(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.getCurrentUserUnreadMessagesAmounts}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Deletes a message from database
   *
   * @param {MessageId} messageId id of concerned message
   */
  public deleteMessage(messageId: MessageId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.deleteMessage
      .replace(':id', messageId)}`;

    return this.httpClient.delete(apiURL);
  }

  /**
   * Updates a message in the database
   *
   * @param {MessageId} messageId id of concerned message
   * @param {object} changedData   changed values as object
   */
  public updateMessage(messageId: MessageId, changedData: object): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.updateMessage
      .replace(':id', messageId)}`;

    return this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Marks a message as read
   *
   * @param {MessageId} messageId id of concerned message
   */
  public markMessageAsRead(messageId: MessageId): Observable<any> {
    return this.updateMessage(messageId, { readStatus: true });
  }

  /**
   * Marks a message as unread
   *
   * @param {MessageId} messageId id of concerned message
   */
  public markMessageAsUnread(messageId: MessageId): Observable<any> {
    return this.updateMessage(messageId, { readStatus: false });
  }
}
