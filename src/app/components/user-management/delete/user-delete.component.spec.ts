import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { UserDeleteComponent } from './user-delete.component';
import {UserId} from "../../../types/aliases/user-id";
import {Observable} from "rxjs";
import {User} from "../../../types/user";
import {AdminService} from "../../../services/admin.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";

class MockAdminService {
  getUser(userId: UserId): Observable<User> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next({
        id: "userXY",
        email: "user@test.com",
        firstName: "user",
        lastName: "userson",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4
      });
    });
  }

  deleteUser(userId: UserId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
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
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next({
        id: "anotherUserId",
        email: "anotheruser@test.com",
        firstName: "another",
        lastName: "user",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4
      });
    });
  }

  deleteUser(): Observable<User> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next();
    });
  }
  }

class MockAuthService {
  public getUserId(): UserId {
    return 'userXY';
  }
  }

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: AdminService, useClass: MockAdminService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page with admin service', fakeAsync(() => {
    expect(component.user).toEqual({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');

    component.user.id = 'userXY';

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: "userXY",
      email: "user@test.com",
      firstName: "user",
      lastName: "userson",
      role: 2,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: 4
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('user');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('userson');
    expect(component.userDeleteForm.controls['email'].value).toEqual('user@test.com');
    expect(component.userDeleteForm.controls['role'].value).toEqual(2);
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual(4);
  }));

  it('should init page with user service when id is null', fakeAsync(() => {
    expect(component.user).toEqual({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: "anotherUserId",
      email: "anotheruser@test.com",
      firstName: "another",
      lastName: "user",
      role: 2,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: 4
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('another');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('user');
    expect(component.userDeleteForm.controls['email'].value).toEqual('anotheruser@test.com');
    expect(component.userDeleteForm.controls['role'].value).toEqual(2);
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual(4);
  }));

  it('should throw an error on init page with admin service', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.user).toEqual({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');

    component.user.id = 'userXY';

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: 'userXY',
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should throw an error on init page with user service when user id is null', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.user).toEqual({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeleteForm.controls['firstName'].value).toEqual('');
    expect(component.userDeleteForm.controls['lastName'].value).toEqual('');
    expect(component.userDeleteForm.controls['email'].value).toEqual('');
    expect(component.userDeleteForm.controls['role'].value).toEqual('');
    expect(component.userDeleteForm.controls['notificationChannel'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should delete user', fakeAsync(() => {
    component.user.id = 'userXY';

    const consoleError = spyOn(console, 'error');
    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteUser();
    tick();

    expect(consoleError).not.toHaveBeenCalled();
    expect(modalClose).toHaveBeenCalledWith('deleted');
  }));

  it('should delete user when deleted by admin', fakeAsync(() => {
    component.user.id = 'anotherUserId';

    const consoleError = spyOn(console, 'error');
    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteUser();
    tick();

    expect(consoleError).not.toHaveBeenCalled();
    expect(modalClose).toHaveBeenCalledWith('deleted');
  }));

  it('should throw an error on delete user', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'userXY';

    const consoleError = spyOn(console, 'error');
    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteUser();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(modalClose).not.toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should throw an error on delete user when called as an admin', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'anotherUserId';

    const consoleError = spyOn(console, 'error');
    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteUser();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(modalClose).not.toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));
});

