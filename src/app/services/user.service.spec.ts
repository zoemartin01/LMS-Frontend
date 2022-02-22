import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {NotificationChannel} from "../types/enums/notification-channel";
import {User} from "../types/user";
import {UserRole} from "../types/enums/user-role";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current users details', () => {
    service.getUserDetails().subscribe(
      res => {
        expect(res).toEqual({
          id: "userXY",
          email: "user@test.com",
          firstName: "user",
          lastName: "userson",
          role: 2,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: NotificationChannel.emailAndMessageBox
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.getSingleUser.replace(':id', 'userXY')}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "userXY",
      email: "user@test.com",
      firstName: "user",
      lastName: "userson",
      role: 2,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: NotificationChannel.emailAndMessageBox
    });
  });

  it('should get full name of a user', () => {
    const user: User = {
      id: "userXY",
      email: "user@test.com",
      firstName: "user",
      lastName: "userson",
      role: 2,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: NotificationChannel.emailAndMessageBox
    }
    expect(service.getFullName(user)).toEqual(`user userson`);
  });

  it('should update current user', () => {
      service.editUserData({
        email: "user@test.teco.com",
        role: 3,
      }).subscribe(
        res => {
          expect(res).toEqual({
            id: "userXY",
            email: "user@test.teco.com",
            firstName: "user",
            lastName: "userson",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          });
        }
      );

      const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.updateUser.replace(':id', 'userXY')}`);

      expect(mockRequest.request.body).toEqual({
        email: "user@test.teco.com",
        role: 3,
      });
      expect(mockRequest.request.method).toBe('PATCH');

      mockRequest.flush({
        id: "userXY",
        email: "user@test.teco.com",
        firstName: "user",
        lastName: "userson",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      });
    });
  it('should register new user', () => {
    service.register('user', 'userson','user@test.teco.com', 'bestPassword123').subscribe(
      res => {
        expect(res).toEqual({
          id: "userXY",
          email: "user@test.teco.com",
          firstName: "user",
          lastName: "userson",
          role: 1,
          emailVerification: false,
          isActiveDirectory: false,
          notificationChannel: 2
        })
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_settings.register}`);

    expect(mockRequest.request.body).toEqual({
      firstName: 'user',
      lastName: 'userson',
      email: 'user@test.teco.com',
      password: 'bestPassword123'
    });

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      id: "userXY",
      email: "user@test.teco.com",
      firstName: "user",
      lastName: "userson",
      role: 0,
      emailVerification: false,
      isActiveDirectory: false,
      notificationChannel: 2
    });
  });

  it('should verify email for user with specific id', () => {
    service.verifyEmail('userXY', 'TokenForUserXY').subscribe(
      res => {
        expect(res).toEqual({
          id: "userXY",
          email: "user@test.teco.com",
          firstName: "user",
          lastName: "userson",
          role: 1,
          emailVerification: false,
          isActiveDirectory: false,
          notificationChannel: 2
        })
      });

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_settings.verifyEmail}`);

    expect(mockRequest.request.body).toEqual({
      userId: 'userXY',
      token: 'TokenForUserXY'
    });

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      id: "userXY",
      email: "user@test.teco.com",
      firstName: "user",
      lastName: "userson",
      role: 1,
      emailVerification: false,
      isActiveDirectory: false,
      notificationChannel: 2
    });
  });

  it('should delete current user', () => {
    service.deleteUser().subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.deleteUser.replace(':id', 'userXY')}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  })
})
