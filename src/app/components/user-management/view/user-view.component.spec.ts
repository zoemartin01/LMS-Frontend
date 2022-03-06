import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { UserViewComponent } from './user-view.component';

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
}

class MockModalService {
  user: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
    emailVerification: true,
    isActiveDirectory: false,
  };

  open(): { componentInstance: { user: User }, result: Promise<string> } {
    return {
      componentInstance: {
        user: this.user
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    }
  }
}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserViewComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
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
    expect(component.userViewForm.controls['firstName'].value).toEqual('');
    expect(component.userViewForm.controls['lastName'].value).toEqual('');
    expect(component.userViewForm.controls['email'].value).toEqual('');
    expect(component.userViewForm.controls['password'].value).toEqual('');
    expect(component.userViewForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userViewForm.controls['role'].value).toEqual('');
    expect(component.userViewForm.controls['notificationChannel'].value).toEqual('');

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
    expect(component.userViewForm.controls['firstName'].value).toEqual('user');
    expect(component.userViewForm.controls['lastName'].value).toEqual('userson');
    expect(component.userViewForm.controls['email'].value).toEqual('user@test.com');
    expect(component.userViewForm.controls['password'].value).toEqual('');
    expect(component.userViewForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userViewForm.controls['role'].value).toEqual(2);
    expect(component.userViewForm.controls['notificationChannel'].value).toEqual(4);
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
    expect(component.userViewForm.controls['firstName'].value).toEqual('');
    expect(component.userViewForm.controls['lastName'].value).toEqual('');
    expect(component.userViewForm.controls['email'].value).toEqual('');
    expect(component.userViewForm.controls['password'].value).toEqual('');
    expect(component.userViewForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userViewForm.controls['role'].value).toEqual('');
    expect(component.userViewForm.controls['notificationChannel'].value).toEqual('');

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
    expect(component.userViewForm.controls['firstName'].value).toEqual('');
    expect(component.userViewForm.controls['lastName'].value).toEqual('');
    expect(component.userViewForm.controls['email'].value).toEqual('');
    expect(component.userViewForm.controls['password'].value).toEqual('');
    expect(component.userViewForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userViewForm.controls['role'].value).toEqual('');
    expect(component.userViewForm.controls['notificationChannel'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should open user edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    component.user.id = 'userXY';
    component.dirty = false;

    component.openUserEditForm();
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open user deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.user.id = 'userXY';

    const closeModalMethod = spyOn(component.activeModal, 'close');

    component.openUserDeletionDialog();
    tick();

    expect(closeModalMethod).toHaveBeenCalledWith('dirty');

    localStorage.removeItem('returnVal');
  }));
});
