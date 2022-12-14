import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { EmailVerificationComponent } from './email-verification.component';

import { UserService } from '../../../services/user.service';

import { User } from '../../../types/user';
import { UserId } from '../../../types/aliases/user-id';
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private _testParams: object = {};

  get testParams() {
    return this._testParams;
  }

  set testParams(params: object) {
    this._testParams = params;
    this.subject.next(params);
  }
}

class MockUserService {
  verifyEmail(userId: UserId, token: string): Observable<User> {
    return new Observable((observer) => {
      if (userId !== '59f1589d-197c-4f53-bfc1-4c57aae14c42' || token !== 'ixhgvplqq') {
        observer.error({
          error: {
            message: 'Token doesn\'t match.',
          },
        });
      }

      const user: User = {
        id: userId,
        firstName: 'Alex',
        lastName: 'Mustermensch',
        email: 'alex@mustermensch.com',
        role: UserRole.visitor,
        notificationChannel: NotificationChannel.emailAndMessageBox,
        emailVerification: true,
        isActiveDirectory: false,
      }

      observer.next(user);
    });
  }
}

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [
        EmailVerificationComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;

    mockActivatedRoute.testParams = {};
    router.navigateByUrl.calls.reset();
  });

  it('should create email verification component', () => {
    expect(component).toBeTruthy();
  });

  it('should init without route parameters', fakeAsync(() => {
    let verifyEmailMethod = spyOn(component,'verifyEmail');

    expect(component.showForm).withContext('don\'t show form before init').toBeFalse();
    component.ngOnInit();
    tick();

    expect(component.showForm).withContext('show form after init').toBeTrue();
    expect(component.verifyForm.value).withContext('empty form').toEqual({
      userId: '',
      token: '',
    });
    expect(verifyEmailMethod).not.toHaveBeenCalled();
  }));

  it('should init with route parameters', fakeAsync(() => {
    mockActivatedRoute.testParams = {
      userId: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
      token: 'ixhgvplqq',
    };

    let verifyEmailMethod = spyOn(component,'verifyEmail');

    expect(component.showForm).withContext('don\'t show form before init').toBeFalse();
    component.ngOnInit();
    tick();

    expect(component.showForm).withContext('still don\'t show form after init').toBeFalse();
    expect(component.verifyForm.value).withContext('has form values').toEqual({
      userId: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
      token: 'ixhgvplqq',
    });
    expect(verifyEmailMethod).toHaveBeenCalledWith();
  }));

  it('should send api request and redirect to login on success', (done: DoneFn) => {
    component.verifyForm.controls['userId'].setValue('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    component.verifyForm.controls['token'].setValue('ixhgvplqq');

    component.verifyEmail().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
      expect(component.errorMessage).toBe('');
      expect(component.showForm).toBeFalse();
      done();
    });
  });

  it('should send api request and show error on failure', (done: DoneFn) => {
    component.verifyForm.controls['userId'].setValue('59f1589d-197c-4f53-bfc1-4c57aae14c42');
    component.verifyForm.controls['token'].setValue('iXhgvPIqq');

    component.verifyEmail().then(() => {
      expect(component.errorMessage).toBe('Token doesn\'t match.');
      expect(component.showForm).toBeTrue();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });

  it('should show error when form is invalid', (done: DoneFn) => {
    component.verifyForm.controls['userId'].setValue('');
    component.verifyForm.controls['token'].setValue('');

    component.verifyEmail().then(() => {
      expect(component.errorMessage).toBe('You need to fill in all required fields!');
      expect(component.showForm).toBeTrue();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });
});
