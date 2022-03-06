import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterComponent } from './register.component';

import { UserService } from '../../../services/user.service';

import { User } from '../../../types/user';
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

class MockUserService {
  register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    return new Observable((observer) => {
      if (email === 'known@example.com') {
        observer.error({
          error: {
            message: 'User with this email already exists.',
          }
        });
      }

      const user: User = {
        id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
        firstName,
        lastName,
        email,
        role: UserRole.pending,
        notificationChannel: NotificationChannel.emailOnly,
        emailVerification: true,
        isActiveDirectory: false,
      }

      observer.next(user);
    });
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    router.navigateByUrl.calls.reset();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should register user with their data', (done: DoneFn) => {
    component.registerForm.controls['firstname'].setValue('Alex');
    component.registerForm.controls['name'].setValue('Mustermensch');
    component.registerForm.controls['email'].setValue('alex@mustermensch.com');
    component.registerForm.controls['password'].setValue('bestPasswordEver!');
    component.registerForm.controls['password_confirmation'].setValue('bestPasswordEver!');
    component.registerForm.controls['safetyInstructions'].setValue(true);
    component.registerForm.controls['hwlabRules'].setValue(true);

    expect(component.registerForm.valid).toBeTrue();

    component.register().then(() => {
      expect(component.errorMessage).toBe('');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/register/verify-email');
      done();
    });
  });

  it('should handle registration error', (done: DoneFn) => {
    component.registerForm.controls['firstname'].setValue('Known');
    component.registerForm.controls['name'].setValue('User');
    component.registerForm.controls['email'].setValue('known@example.com');
    component.registerForm.controls['password'].setValue('superPassword!');
    component.registerForm.controls['password_confirmation'].setValue('superPassword!');
    component.registerForm.controls['safetyInstructions'].setValue(true);
    component.registerForm.controls['hwlabRules'].setValue(true);

    expect(component.registerForm.valid).toBeTrue();

    component.register().then(() => {
      expect(component.errorMessage).toBe('User with this email already exists.');
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });

  it('should show error when form is invalid', (done: DoneFn) => {
    component.registerForm.controls['firstname'].setValue('');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['password_confirmation'].setValue('');
    component.registerForm.controls['safetyInstructions'].setValue(false);
    component.registerForm.controls['hwlabRules'].setValue(false);

    expect(component.registerForm.valid).toBeFalse();

    component.register().then(() => {
      expect(component.errorMessage).toBe('You need to fill in all required fields and check all  required checkboxes!');
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });

  it('should confirm password', fakeAsync(() => {
    expect(component.errorMessage).toBe('');

    component.registerForm.controls['password'].setValue('superPassword!');
    component.registerForm.controls['password_confirmation'].setValue('superPassword!');

    component.checkPasswordConfirmation();
    tick();

    expect(component.errorMessage).toBe('');
  }));

  it('should show password confirmation failure because password and password conformation fields don\'t match', fakeAsync(() => {
    expect(component.errorMessage).toBe('');

    component.registerForm.controls['password'].setValue('superPassword!');
    component.registerForm.controls['password_confirmation'].setValue('superPasswrod!');

    component.checkPasswordConfirmation();
    tick();

    expect(component.errorMessage).toBe('Password confirmation failed!');
  }));
});
