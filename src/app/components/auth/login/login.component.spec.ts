import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WINDOW } from "../../../providers/window.providers";
import { environment } from "../../../../environments/environment";

import { LoginComponent } from './login.component';

import { AuthService } from '../../../services/auth.service';

import { UserRole } from "../../../types/enums/user-role";
import Spy = jasmine.Spy;

class MockAuthService {
  public login(email: string, password: string, isActiveDirectory: boolean) {
    return new Observable((observer) => {
      if (email !== 'alex@mustermensch.com' || password !== 'bestPasswordEver!') {
        observer.error({
          error: {
            error: {
              message: 'Invalid email or password.',
            }
          }
        });
      }

      observer.next({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM',
        role: UserRole.visitor,
        userId: '59f1589d-197c-4f53-bfc1-4c57aae14c42'
      });
    });
  }

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
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let locationReload: Spy;
  let router = {
    navigateByUrl: (url: string) => {
      return new Promise<boolean>(resolve =>  resolve(true));
    },
  };
  let windowMock: Window = <any>{
    location: {
      reload: () => {},
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: router },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    locationReload = spyOn(windowMock.location, 'reload');
    locationReload.calls.reset();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should login user with correct credentials', (done: DoneFn) => {
    component.loginForm.controls['email'].setValue('alex@mustermensch.com');
    component.loginForm.controls['password'].setValue('bestPasswordEver!');

    expect(component.loginForm.valid).toBeTrue();

    component.login().then(() => {
      expect(component.errorMessage).toBe('');
      done();
    });
  });

  it('should handle login error', (done: DoneFn) => {
    component.loginForm.controls['email'].setValue('alex@mustermensch.com');
    component.loginForm.controls['password'].setValue('wrongPassword');

    expect(component.loginForm.valid).toBeTrue();

    component.login().then(() => {
      expect(component.errorMessage).not.toEqual('');
      expect(locationReload).not.toHaveBeenCalled();
      done();
    });
  });

  it('should show error when form is invalid', (done: DoneFn) => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalse();

    component.login().then(() => {
      expect(component.errorMessage).toBe('Invalid form values');
      expect(locationReload).not.toHaveBeenCalled();
      done();
    });
  });
});
