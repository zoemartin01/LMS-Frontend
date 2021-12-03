import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Message } from "../types/message";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private httpClient: HttpClient) {
  }

  public getMessages(): Observable<any> {
  }

  public getUnreadMessagesAmounts(): Observable<any> {
  }

  public sendMessage(recipient: UserId, message: Message): Observable<any> {
  }

  public deleteMessage(messageId: number): Observable<any> {
  }

  public markMessageAsRead(messageId: number): Observable<any> {
  }
}
