import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { UserDeclineComponent } from './user-decline.component';

import { AdminService } from "../../../services/admin.service";

import { User } from "../../../types/user";
import { UserId } from "../../../types/aliases/user-id";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

class MockAdminService {
  getUser(userId: UserId): Observable<User> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
      }

      observer.next({
        id: "userAB",
        email: "user11@test.com",
        firstName: "user",
        lastName: "usersonsonson",
        role: 1,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4,
      });
    });
  }

  declineUserRequest(userId: UserId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
      }

      observer.next();
    });
  }
}

describe('UserDeclineComponent', () => {
  let component: UserDeclineComponent;
  let fixture: ComponentFixture<UserDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserDeclineComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeclineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
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
    expect(component.userDeclineForm.controls['firstname'].value).toEqual('');
    expect(component.userDeclineForm.controls['name'].value).toEqual('');
    expect(component.userDeclineForm.controls['email'].value).toEqual('');

    component.user.id = 'userAB';

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: "userAB",
      email: "user11@test.com",
      firstName: "user",
      lastName: "usersonsonson",
      role: 1,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: 4
    });
    expect(component.userDeclineForm.controls['firstname'].value).toEqual('user');
    expect(component.userDeclineForm.controls['name'].value).toEqual('usersonsonson');
    expect(component.userDeclineForm.controls['email'].value).toEqual('user11@test.com');
  }));

  it('should throw an error on init page', fakeAsync(() => {
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
    expect(component.userDeclineForm.controls['firstname'].value).toEqual('');
    expect(component.userDeclineForm.controls['name'].value).toEqual('');
    expect(component.userDeclineForm.controls['email'].value).toEqual('');

    component.user.id = 'userAB';

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(component.user).toEqual({
      id: 'userAB',
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    });
    expect(component.userDeclineForm.controls['firstname'].value).toEqual('');
    expect(component.userDeclineForm.controls['name'].value).toEqual('');
    expect(component.userDeclineForm.controls['email'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should accept user', fakeAsync(() => {
    component.user.id = 'userAB';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.declineUser();
    tick();

    expect(modalClose).toHaveBeenCalledWith('declined');
    expect(consoleError).not.toHaveBeenCalled();
  }));

  it('should throw an error on accept user', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'userAB';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.declineUser();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));
});
