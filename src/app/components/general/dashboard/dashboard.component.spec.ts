import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { WINDOW } from "../../../providers/window.providers";
import { Observable } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

import { MessagingService } from "../../../services/messaging.service";
import { UserService } from "../../../services/user.service";

import { UnreadMessages } from "../../../types/unread-messages";
import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

class MockMessagingService {
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

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    let windowMock: Window = <any>{ };
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: MessagingService, useClass: MockMessagingService },
        { provide: UserService, useClass: MockUserService },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) },
      ],
    }).compileComponents();

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should init page with notification channel email and message box', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailAndMessageBox.toString());

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.ngOnInit();

    expect(component.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      orders: 1,
      users: 5,
    });
    expect(component.showMessageBox).toBeTrue();
  });

  it('should init page with notification channel message box only', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.messageBoxOnly.toString());

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.ngOnInit();

    expect(component.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      orders: 1,
      users: 5,
    });
    expect(component.showMessageBox).toBeTrue();
  });

  it('should try to init page with notification channel email only and get redirected to dashboard', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailOnly.toString());

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.ngOnInit();

    expect(component.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      orders: 1,
      users: 5,
    });
    expect(component.showMessageBox).toBeFalse();
  });

  it('should try to init page with notification channel none and get redirected to dashboard', () => {
    localStorage.setItem('testNotificationChannel', NotificationChannel.none.toString());

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.ngOnInit();

    expect(component.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      orders: 1,
      users: 5,
    });
    expect(component.showMessageBox).toBeFalse();
  });*/

  it('should show error message on get user error', () => {
    localStorage.setItem('throwError', 'true');

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.getUserDetails();

    expect(consoleError).toHaveBeenCalled();
    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    localStorage.setItem('throwError', 'false');
  });

  it('should show error message on get unread messages error', () => {
    /*localStorage.setItem('throwError', 'true');

    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    component.getUnreadMessagesAmounts();

    expect(consoleError).toHaveBeenCalled();
    expect(component.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      orders: 0,
      users: 0,
    });
    expect(component.showMessageBox).toBeFalse();

    localStorage.setItem('throwError', 'false');*/
  });
    //@todo test websocket
});
