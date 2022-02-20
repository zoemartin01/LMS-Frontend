import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from 'rxjs';

import { MessageBoxComponent } from './message-box.component';

import { MessagingService } from "../../../services/messaging.service";
import { UserService } from "../../../services/user.service";

import { Message } from "../../../types/message";
import { MessageId } from "../../../types/aliases/message-id";
import { UnreadMessages } from "../../../types/unread-messages";
import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { PagedList } from "../../../types/paged-list";

class MockMessagingService {
  getMessages(): Observable<Message[]> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            }
          }
        });
      }

      const messages: Message[] = [
        {
          id: '312d8319-c253-4ee4-8771-a4a8d4a2f411',
          title: 'Verify Email to confirm account',
          content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
          correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
          correspondingUrlText: 'Verify Email',
          readStatus: false,
        },
        {
          id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
          title: 'Verify Email to confirm account',
          content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
          correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
          correspondingUrlText: 'Verify Email',
          readStatus: false,
        },
      ];

      observer.next(messages);
    });
  }

  public getUnreadMessagesAmounts(): Observable<UnreadMessages> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            }
          }
        });
      }

      const unreadMessages: UnreadMessages = {
        sum: 12,
        appointments: 3,
        orders: 1,
        users: 5,
      };

      observer.next(unreadMessages);
    });
  }

  public updateMessage(messageId: MessageId, changedData: { readStatus: boolean }): Observable<Message> {
    return new Observable((observer) => {
      if (messageId === '312d8319-c253-4ee4-8771-a4a8d4a2f411') {
        observer.error({
          error: {
            error: {
              message: 'Message not found.',
            }
          }
        });
      }

      const messages: Message = {
        id: messageId,
        title: 'Verify Email to confirm account',
        content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
        correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
        correspondingUrlText: 'Verify Email',
        readStatus: changedData.readStatus,
      };

      observer.next(messages);
    });
  }

  markMessageAsRead(messageId: MessageId): Observable<Message> {
    return this.updateMessage(messageId, { readStatus: true });
  }

  markMessageAsUnread(messageId: MessageId): Observable<Message> {
    return this.updateMessage(messageId, { readStatus: false });
  }
}

class MockUserService {
  getUserDetails(): Observable<User> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'User not found.',
            }
          }
        });
      }

      const user: User = {
        id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
        firstName: 'Alex',
        lastName: 'Mustermensch',
        email: 'alex@mustermensch.com',
        role: UserRole.visitor,
        notificationChannel: <NotificationChannel><any>(+(localStorage.getItem('testNotificationChannel') ?? 0)),
        emailVerification: true,
        isActiveDirectory: false,
      }

      observer.next(user);
    });
  }
}

class MockModalService {
  open(): { componentInstance: { message: Message|null }, result: Promise<string> } {
    return {
      componentInstance: { message:  null },
      result: new Promise<string>(resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('MessageBoxComponent - calls of updatePage', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  let consoleError: jasmine.Spy<any>;
  let updatePageMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MessageBoxComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgxPaginationModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: MessagingService, useClass: MockMessagingService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: router },
        { provide: NgbModal, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    updatePageMethod = spyOn(component, 'updatePage');

    router.navigateByUrl.calls.reset();
    consoleError.calls.reset();
    updatePageMethod.calls.reset();
  });

  it('should create message box component', () => {
    expect(component).toBeTruthy();
  });

  it('should init page with notification channel email and message box', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailAndMessageBox.toString());

    component.ngOnInit();

    expect(updatePageMethod).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dashboard');
  });

  it('should init page with notification channel message box only', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.messageBoxOnly.toString());

    component.ngOnInit();

    expect(updatePageMethod).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dashboard');
  });

  it('should try to init page with notification channel email only and get redirected to dashboard', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailOnly.toString());

    component.ngOnInit();

    expect(updatePageMethod).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should try to init page with notification channel none and get redirected to dashboard', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.none.toString());

    component.ngOnInit();

    expect(updatePageMethod).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should show error message on init error', () => {
    localStorage.setItem('throwError', 'true');

    component.ngOnInit();

    expect(consoleError).toHaveBeenCalled();
    expect(updatePageMethod).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dashboard');

    localStorage.setItem('throwError', 'false');
  });

  it('should mark message as read', () => {
    component.markMessageAsRead('b16a9b6a-aa07-41a6-ab5a-c972c2894458');

    expect(consoleError).not.toHaveBeenCalled();
    expect(updatePageMethod).toHaveBeenCalled();
  });

  it('should show error message on mark message as read error', () => {
    component.markMessageAsRead('312d8319-c253-4ee4-8771-a4a8d4a2f411');

    expect(consoleError).toHaveBeenCalled();
    expect(updatePageMethod).not.toHaveBeenCalled();
  });

  it('should mark message as unread', () => {
    component.markMessageAsUnread('b16a9b6a-aa07-41a6-ab5a-c972c2894458');

    expect(consoleError).not.toHaveBeenCalled();
    expect(updatePageMethod).toHaveBeenCalled();
  });

  it('should show error message on mark message as unread error', () => {
    component.markMessageAsUnread('312d8319-c253-4ee4-8771-a4a8d4a2f411');

    expect(consoleError).toHaveBeenCalled();
    expect(updatePageMethod).not.toHaveBeenCalled();
  });
});

describe('MessageBoxComponent - calls of getters', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MessageBoxComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: MessagingService, useClass: MockMessagingService },
        { provide: UserService, useClass: MockUserService },
        { provide: NgbModal, useClass: MockModalService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');

    router.navigateByUrl.calls.reset();
    consoleError.calls.reset();
  });

  it('should create message box component', () => {
    expect(component).toBeTruthy();
  });

  it('should get unread messages amounts and messages on page update', () => {
    let getUnreadMessagesAmountsMethod = spyOn(component, 'getUnreadMessagesAmounts');
    let getMessagesMethod = spyOn(component, 'getMessages');

    component.updatePage();

    expect(getUnreadMessagesAmountsMethod).toHaveBeenCalled();
    expect(getMessagesMethod).toHaveBeenCalled();
  });

  it('should update messages when message is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    let getMessagesMethod = spyOn(component, 'getMessages');

    component.openMessageDeletionDialog({
      id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
      title: 'Verify Email to confirm account',
      content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
      correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
      correspondingUrlText: 'Verify Email',
      readStatus: false,
    });

    tick();

    expect(getMessagesMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update messages when message deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    let getMessagesMethod = spyOn(component, 'getMessages');

    component.openMessageDeletionDialog({
      id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
      title: 'Verify Email to confirm account',
      content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
      correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
      correspondingUrlText: 'Verify Email',
      readStatus: false,
    });

    tick();

    expect(getMessagesMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});

describe('MessageBoxComponent - http functions', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MessageBoxComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: MessagingService, useClass: MockMessagingService },
        { provide: UserService, useClass: MockUserService },
        { provide: NgbModal, useClass: MockModalService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');

    router.navigateByUrl.calls.reset();
    consoleError.calls.reset();
  });

  it('should create message box component', () => {
    expect(component).toBeTruthy();
  });

  it('should get unread messages amounts', () => {
    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
  });

    component.getUnreadMessagesAmounts();

    expect(component.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      orders: 1,
      users: 5,
    });
  });

  it('should show error message on get unread messages amounts error', () => {
    localStorage.setItem('throwError', 'true');

    component.getUnreadMessagesAmounts();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  });

  it('should get messages', () => {
    let pagedListMessages = new PagedList<Message>();
    pagedListMessages.pageSize = 8;

    //expect(component.messages).toEqual(pagedListMessages);

    component.getMessages();

    pagedListMessages.data = [
      {
        id: '312d8319-c253-4ee4-8771-a4a8d4a2f411',
        title: 'Verify Email to confirm account',
        content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
        correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
        correspondingUrlText: 'Verify Email',
        readStatus: false,
      },
      {
        id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
        title: 'Verify Email to confirm account',
        content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
        correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
        correspondingUrlText: 'Verify Email',
        readStatus: false,
      },
    ];
    //expect(component.messages).toEqual(pagedListMessages);
  });

  it('should show error message on get messages error', () => {
    localStorage.setItem('throwError', 'true');

    component.getMessages();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  });
});
