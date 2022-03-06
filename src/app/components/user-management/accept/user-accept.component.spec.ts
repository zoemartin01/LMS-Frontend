import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { UserAcceptComponent } from './user-accept.component';

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

  acceptUserRequest(userId: UserId): Observable<any> {
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

describe('UserAcceptComponent', () => {
  let component: UserAcceptComponent;
  let fixture: ComponentFixture<UserAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserAcceptComponent,
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

    fixture = TestBed.createComponent(UserAcceptComponent);
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
    expect(component.userAcceptForm.controls['firstname'].value).toEqual('');
    expect(component.userAcceptForm.controls['name'].value).toEqual('');
    expect(component.userAcceptForm.controls['email'].value).toEqual('');

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
      notificationChannel: 4,
    });
    expect(component.userAcceptForm.controls['firstname'].value).toEqual('user');
    expect(component.userAcceptForm.controls['name'].value).toEqual('usersonsonson');
    expect(component.userAcceptForm.controls['email'].value).toEqual('user11@test.com');
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
    expect(component.userAcceptForm.controls['firstname'].value).toEqual('');
    expect(component.userAcceptForm.controls['name'].value).toEqual('');
    expect(component.userAcceptForm.controls['email'].value).toEqual('');

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
    expect(component.userAcceptForm.controls['firstname'].value).toEqual('');
    expect(component.userAcceptForm.controls['name'].value).toEqual('');
    expect(component.userAcceptForm.controls['email'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should accept user', fakeAsync(() => {
    component.user.id = 'userAB';

    const modalClose = spyOn(component.activeModal, 'close');

    component.acceptUser();
    tick();

    expect(modalClose).toHaveBeenCalledWith('accepted');
    expect(component.errorMessage).toBe('');
  }));

  it('should throw an error on accept user', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'userAB';

    const modalClose = spyOn(component.activeModal, 'close');

    component.acceptUser();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Internal Server Error.');

    localStorage.removeItem('throwError');
  }));
});
