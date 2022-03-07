import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { WINDOW } from "../providers/window.providers";

import { Message } from "../types/message";
import { MessageId } from "../types/aliases/message-id";
import { UnreadMessages } from "../types/unread-messages";
import { PagedResponse } from '../types/paged-response';

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides API access for message system
 * @typedef {Service} MessagingService
 * @class
 */
export class MessagingService {
  constructor(private httpClient: HttpClient, @Inject(WINDOW) private window: Window) {
  }

  /**
   * Retrieves all messages for current user
   */
  public getMessages(
    limit: number = 0,
    offset: number = 0,
  ): Observable<PagedResponse<Message>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.getCurrentUserMessages}` +
    `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Message>>(apiURL);
  }

  /**
   * Retrieves the amounts of unread messages for current user
   */
  public getUnreadMessagesAmounts(): Observable<UnreadMessages> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.getCurrentUserUnreadMessagesAmounts}`;

    return this.httpClient.get<UnreadMessages>(apiURL);
  }

  /**
   * Deletes a message from database
   *
   * @param {MessageId} messageId id of concerned message
   */
  public deleteMessage(messageId: MessageId): Observable<void> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.deleteMessage
      .replace(':id', messageId)}`;

    return this.httpClient.delete<void>(apiURL);
  }

  /**
   * Updates a message in the database
   *
   * @param {MessageId} messageId id of concerned message
   * @param {object} changedData   changed values as object
   */
  public updateMessage(messageId: MessageId, changedData: object): Observable<Message> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.messages.updateMessage
      .replace(':id', messageId)}`;

    return this.httpClient.patch<Message>(apiURL, changedData);
  }

  /**
   * Marks a message as read
   *
   * @param {MessageId} messageId id of concerned message
   */
  public markMessageAsRead(messageId: MessageId): Observable<Message> {
    return this.updateMessage(messageId, { readStatus: true });
  }

  /**
   * Marks a message as unread
   *
   * @param {MessageId} messageId id of concerned message
   */
  public markMessageAsUnread(messageId: MessageId): Observable<Message> {
    return this.updateMessage(messageId, { readStatus: false });
  }

  /**
   * Gets the live stream feed
   */
  public unreadMessagesWebSocketPath(): string {
    const isSSL = this.window.location.protocol === 'https:';
    const protocol = isSSL ? 'wss:' : 'ws:';

    let host: string = this.window.location.hostname + environment.baseUrl;

    if (!environment.production) {
      host = environment.baseUrl.replace(/http(s)?:\/\//g, '');
    }

    const token = localStorage.getItem(environment.storageKeys.accessToken);
    return `${protocol}//${host}${environment.apiRoutes.messages.registerMessageWebsocket}?token=${token}`;
  }
}
