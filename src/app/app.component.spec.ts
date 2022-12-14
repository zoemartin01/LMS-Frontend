import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import {} from 'jasmine';
import { Observable } from 'rxjs';
import { WINDOW } from "./providers/window.providers";
import { environment } from "../environments/environment";

import { AppComponent } from './app.component';

import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

import { User } from "./types/user";
import { UserRole } from "./types/enums/user-role";
import { NotificationChannel } from "./types/enums/notification-channel";

class MockWebSocket {
  public path: string = '';
  public onmessage: ((this: WebSocket, ev: MessageEvent) => any) = () => {};

  constructor(path: string) {
    this.path = path;
  }
}

class MockAuthService {
  public setAccessToken(accessToken: string): void {
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(environment.storageKeys.refreshToken, refreshToken);
  }

  public setUserId(userId: string): void {
    localStorage.setItem(environment.storageKeys.userId, userId);
  }

  public setUserRole(userRole: UserRole): void {
    localStorage.setItem(environment.storageKeys.userRole, userRole.toString());
  }

  public isUserLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  public getAccessToken(): string {
    return <string>localStorage.getItem(environment.storageKeys.accessToken);
  }

  public logout(): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          }
        });
      }

      observer.next();
    });
  }
}

class MockUserService {
  getUserDetails(): Observable<User> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'User not found.',
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

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    let windowMock: Window = <any>{
      location: {
        protocol: 'https:',
        hostname: 'HOST',
      }
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LoadingBarHttpClientModule,
        LoadingBarModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) },
        { provide: WebSocket, useFactory: MockWebSocket },
      ],
    }).compileComponents();

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('do nothing when user is not logged in', () => {
    localStorage.clear()

    expect(app.authService.isUserLoggedIn()).toBeFalse();

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.ngOnInit();

    if (app.websocket.onmessage) {
      app.websocket.onmessage(new MessageEvent<any>('any', {
        data: '{"sum":12,"appointments":3,"appointments_admin":0,"orders":1,"orders_admin":0,"users":5,"settings":0}'
      }));
    }

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();
  });

  it('should init page with notification channel email and message box', () => {
    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailAndMessageBox.toString());

    expect(app.authService.isUserLoggedIn()).toBeTrue();

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.ngOnInit();

    if (app.websocket.onmessage) {
      app.websocket.onmessage(new MessageEvent<any>('any', {
        data: '{"sum":12,"appointments":3,"appointments_admin":0,"orders":1,"orders_admin":0,"users":5,"settings":0}'
      }));
    }

    expect(app.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      appointments_admin: 0,
      orders: 1,
      orders_admin: 0,
      users: 5,
      settings: 0,
    });
    expect(app.showMessageBox).toBeTrue();
  });

  it('should init page with notification channel message box only', () => {
    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    localStorage.setItem('testNotificationChannel', NotificationChannel.messageBoxOnly.toString());

    expect(app.authService.isUserLoggedIn()).toBeTrue();

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.ngOnInit();

    if (app.websocket.onmessage) {
      app.websocket.onmessage(new MessageEvent<any>('any', {
        data: '{"sum":12,"appointments":3,"appointments_admin":0,"orders":1,"orders_admin":0,"users":5,"settings":0}'
      }));
    }

    expect(app.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      appointments_admin: 0,
      orders: 1,
      orders_admin: 0,
      users: 5,
      settings: 0,
    });
    expect(app.showMessageBox).toBeTrue();
  });

  it('should try to init page with notification channel email only', () => {
    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    localStorage.setItem('testNotificationChannel', NotificationChannel.emailOnly.toString());

    expect(app.authService.isUserLoggedIn()).toBeTrue();

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.ngOnInit();

    if (app.websocket.onmessage) {
      app.websocket.onmessage(new MessageEvent<any>('any', {
        data: '{"sum":12,"appointments":3,"appointments_admin":0,"orders":1,"orders_admin":0,"users":5,"settings":0}'
      }));
    }

    expect(app.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      appointments_admin: 0,
      orders: 1,
      orders_admin: 0,
      users: 5,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();
  });

  it('should try to init page with notification channel none', () => {
    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    localStorage.setItem('testNotificationChannel', NotificationChannel.none.toString());

    expect(app.authService.isUserLoggedIn()).toBeTrue();

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.ngOnInit();

    if (app.websocket.onmessage) {
      app.websocket.onmessage(new MessageEvent<any>('any', {
        data: '{"sum":12,"appointments":3,"appointments_admin":0,"orders":1,"orders_admin":0,"users":5,"settings":0}'
      }));
    }

    expect(app.unreadMessages).toEqual({
      sum: 12,
      appointments: 3,
      appointments_admin: 0,
      orders: 1,
      orders_admin: 0,
      users: 5,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();
  });

  it('should show error message on get user error', () => {
    localStorage.setItem('throwError', 'true');

    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    app.getUserDetails();

    expect(consoleError).toHaveBeenCalled();
    expect(app.unreadMessages).toEqual({
      sum: 0,
      appointments: 0,
      appointments_admin: 0,
      orders: 0,
      orders_admin: 0,
      users: 0,
      settings: 0,
    });
    expect(app.showMessageBox).toBeFalse();

    localStorage.removeItem('throwError');
  });

  it('should logout user', (done: DoneFn) => {
    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    expect(localStorage.getItem('accessToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    expect(localStorage.getItem('refreshToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    expect(localStorage.getItem('userId')).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(localStorage.getItem('userRole')).toBe(UserRole.visitor.toString());

    app.logout().then(() => {
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(localStorage.getItem('userId')).toBeNull();
      expect(localStorage.getItem('userRole')).toBeNull();

      done();
    });
  });

  it('should handle logout error', (done: DoneFn) => {
    localStorage.setItem('throwError', 'true');

    app.authService.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    app.authService.setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    app.authService.setUserRole(UserRole.visitor);
    app.authService.setUserId('59f1589d-197c-4f53-bfc1-4c57aae14c42');

    expect(localStorage.getItem('accessToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g');
    expect(localStorage.getItem('refreshToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM');
    expect(localStorage.getItem('userId')).toBe('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    expect(localStorage.getItem('userRole')).toBe(UserRole.visitor.toString());

    app.logout().then(() => {
      expect(consoleError).toHaveBeenCalled();

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(localStorage.getItem('userId')).toBeNull();
      expect(localStorage.getItem('userRole')).toBeNull();

      done();
    });

    localStorage.removeItem('throwError');
  });
});
