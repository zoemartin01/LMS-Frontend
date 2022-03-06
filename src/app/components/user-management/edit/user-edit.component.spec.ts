import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { UserEditComponent } from './user-edit.component';

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
        notificationChannel: 4,
      });
    });
  }

  updateUser(userId: UserId, changedData: object): Observable<User> {
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

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserEditComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
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
    expect(component.userEditForm.controls['firstName'].value).toEqual('');
    expect(component.userEditForm.controls['lastName'].value).toEqual('');
    expect(component.userEditForm.controls['email'].value).toEqual('');
    expect(component.userEditForm.controls['password'].value).toEqual('');
    expect(component.userEditForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userEditForm.controls['role'].value).toEqual(0);
    expect(component.userEditForm.controls['notificationChannel'].value).toEqual('');

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
      notificationChannel: 4,
    });
    expect(component.userEditForm.controls['firstName'].value).toEqual('user');
    expect(component.userEditForm.controls['lastName'].value).toEqual('userson');
    expect(component.userEditForm.controls['email'].value).toEqual('user@test.com');
    expect(component.userEditForm.controls['password'].value).toEqual('');
    expect(component.userEditForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userEditForm.controls['role'].value).toEqual(2);
    expect(component.userEditForm.controls['notificationChannel'].value).toEqual(4);
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
    expect(component.userEditForm.controls['firstName'].value).toEqual('');
    expect(component.userEditForm.controls['lastName'].value).toEqual('');
    expect(component.userEditForm.controls['email'].value).toEqual('');
    expect(component.userEditForm.controls['password'].value).toEqual('');
    expect(component.userEditForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userEditForm.controls['role'].value).toEqual(0);
    expect(component.userEditForm.controls['notificationChannel'].value).toEqual('');

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
    expect(component.userEditForm.controls['firstName'].value).toEqual('');
    expect(component.userEditForm.controls['lastName'].value).toEqual('');
    expect(component.userEditForm.controls['email'].value).toEqual('');
    expect(component.userEditForm.controls['password'].value).toEqual('');
    expect(component.userEditForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userEditForm.controls['role'].value).toEqual(0);
    expect(component.userEditForm.controls['notificationChannel'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should edit User', fakeAsync(() => {
    component.user.id = 'userXY';

    component.userEditForm.controls['firstName'].setValue('Duck');
    component.userEditForm.controls['firstName'].markAsDirty();
    component.userEditForm.controls['lastName'].setValue('Putin');
    component.userEditForm.controls['lastName'].markAsDirty();
    component.userEditForm.controls['email'].setValue('duckputin@test.com');
    component.userEditForm.controls['email'].markAsDirty();
    component.userEditForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userEditForm.controls['password'].markAsDirty();
    component.userEditForm.controls['password_confirmation'].setValue('russianwarshipgofuckyourself');
    component.userEditForm.controls['password_confirmation'].markAsDirty();
    component.userEditForm.controls['role'].setValue('3');
    component.userEditForm.controls['role'].markAsDirty();
    component.userEditForm.controls['notificationChannel'].setValue('3');
    component.userEditForm.controls['notificationChannel'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editUserData();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should throw error on edit user', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'userXY';

    expect(component.errorMessage).toBe('');

    component.userEditForm.controls['firstName'].setValue('Duck');
    component.userEditForm.controls['firstName'].markAsDirty();
    component.userEditForm.controls['lastName'].setValue('Putin');
    component.userEditForm.controls['lastName'].markAsDirty();
    component.userEditForm.controls['email'].setValue('duckputin@test.com');
    component.userEditForm.controls['email'].markAsDirty();
    component.userEditForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userEditForm.controls['password'].markAsDirty();
    component.userEditForm.controls['password_confirmation'].setValue('russianwarshipgofuckyourself');
    component.userEditForm.controls['password_confirmation'].markAsDirty();
    component.userEditForm.controls['role'].setValue('3');
    component.userEditForm.controls['role'].markAsDirty();
    component.userEditForm.controls['notificationChannel'].setValue('3');
    component.userEditForm.controls['notificationChannel'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editUserData();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Internal Server Error.');

    localStorage.removeItem('throwError');
  }));

  it('should throw an error when trying trying to send empty form values', fakeAsync(() => {
    expect(component.errorMessage).toBe('');

    component.user.id = 'userXY';
    component.userEditForm.controls['firstName'].setValue('');
    component.userEditForm.controls['lastName'].setValue('');
    component.userEditForm.controls['email'].setValue('');

    const modalClose = spyOn(component.activeModal, 'close');

    component.editUserData();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('You need to fill in all required fields!');
  }));

  it('should update PasswordConfirmationFails boolean', () => {
    expect(component.errorMessage).toBe('');

    component.userEditForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userEditForm.controls['password_confirmation'].setValue('duckPutin');

    component.checkPasswordConfirmation();

    expect(component.errorMessage).toBe('Password confirmation failed!');
  });
});
