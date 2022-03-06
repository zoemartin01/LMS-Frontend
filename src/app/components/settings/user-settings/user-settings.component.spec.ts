import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { UserSettingsComponent } from './user-settings.component';

import { UserService } from "../../../services/user.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

class MockUserService {
  getUserDetails(): Observable<User> {
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

  editUserData(changedData: object): Observable<User> {
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
        user: this.user,
      },
      result: new Promise<string>(
        resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  }
}

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserSettingsComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
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
    expect(component.userSettingsForm.controls['password'].value).toEqual('');
    expect(component.userSettingsForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userSettingsForm.controls['notificationChannel'].value).toEqual('');

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
    expect(component.userSettingsForm.controls['password'].value).toEqual('');
    expect(component.userSettingsForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userSettingsForm.controls['notificationChannel'].value).toEqual(4);
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
    expect(component.userSettingsForm.controls['password'].value).toEqual('');
    expect(component.userSettingsForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userSettingsForm.controls['notificationChannel'].value).toEqual('');

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
    expect(component.userSettingsForm.controls['password'].value).toEqual('');
    expect(component.userSettingsForm.controls['password_confirmation'].value).toEqual('');
    expect(component.userSettingsForm.controls['notificationChannel'].value).toEqual('');
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should open user deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.user.id = 'userXY';

    const getUserDataMethod = spyOn(component, 'getUserData');

    component.openUserDeletionDialog();
    tick();

    expect(getUserDataMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should edit user data', fakeAsync(() => {
    component.user.id = 'userXY';

    component.userSettingsForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userSettingsForm.controls['password'].markAsDirty();
    component.userSettingsForm.controls['password_confirmation'].setValue('russianwarshipgofuckyourself');
    component.userSettingsForm.controls['password_confirmation'].markAsDirty();
    component.userSettingsForm.controls['notificationChannel'].setValue('3');
    component.userSettingsForm.controls['notificationChannel'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editUserSettings();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should throw an error on user edit', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.user.id = 'userXY';

    component.userSettingsForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userSettingsForm.controls['password'].markAsDirty();
    component.userSettingsForm.controls['password_confirmation'].setValue('russianwarshipgofuckyourself');
    component.userSettingsForm.controls['password_confirmation'].markAsDirty();
    component.userSettingsForm.controls['notificationChannel'].setValue('3');
    component.userSettingsForm.controls['notificationChannel'].markAsDirty();

    const modalClose = spyOn(component.activeModal, 'close');

    component.editUserSettings();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Internal Server Error.');

    localStorage.removeItem('throwError');
  }));

  it('should update PasswordConfirmationFails boolean', () => {
    expect(component.passwordConfirmationFails).toEqual(false);

    component.userSettingsForm.controls['password'].setValue('russianwarshipgofuckyourself');
    component.userSettingsForm.controls['password_confirmation'].setValue('duckPutin');

    component.checkPasswordConfirmation();

    expect(component.passwordConfirmationFails).toEqual(true);
  });
});
