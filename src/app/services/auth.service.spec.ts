import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";

import { AuthService } from './auth.service';

import { UserRole } from "../types/enums/user-role";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers:  [
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    service.login('email@example.com', 'bestPassword4ever!', false).subscribe(
      res => {
        expect(res).toEqual({
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NDk3ODQsInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU0ODU4NH0.jqoTtnAze9GPstvIWROqOcZE9nOGqV2b52AH9K2VicE",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM",
          role: "3",
          userId: "284689bf-1c72-4cfa-bf04-47952c839779",
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.auth.login}`);

    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual({
      email: 'email@example.com',
      password: 'bestPassword4ever!',
      isActiveDirectory: false
    });

    mockRequest.flush({
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NDk3ODQsInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU0ODU4NH0.jqoTtnAze9GPstvIWROqOcZE9nOGqV2b52AH9K2VicE",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM",
      role: "3",
      userId: "284689bf-1c72-4cfa-bf04-47952c839779",
    });
  });

  it('should logout a user', () => {
    service.logout().subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.auth.logout}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should refresh a user\'s token', () => {
    localStorage.clear();

    service.setRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM");

    service.tokenRefresh().subscribe(
      res => {
        expect(res.accessToken).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g");
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.auth.tokenRefresh}`);

    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual({
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM",
    });

    mockRequest.flush({
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g",
    });
  });

  it('should check a user\'s token', () => {
    service.tokenCheck().subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.auth.tokenCheck}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should use local storage', () => {
    localStorage.clear();

    expect(service.isUserLoggedIn()).toBe(false);
    expect(service.getUserRole()).toBe(UserRole.unknown);
    expect(service.isAdmin()).toBe(false);

    service.setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NDk3ODQsInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU0ODU4NH0.jqoTtnAze9GPstvIWROqOcZE9nOGqV2b52AH9K2VicE");
    service.setRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM");
    service.setUserRole(UserRole.admin);
    service.setUserId("284689bf-1c72-4cfa-bf04-47952c839779");

    expect(service.isUserLoggedIn()).toBe(true);
    expect(service.isAdmin()).toBe(true);
    expect(service.getAccessToken()).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NDk3ODQsInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU0ODU4NH0.jqoTtnAze9GPstvIWROqOcZE9nOGqV2b52AH9K2VicE");
    expect(service.getRefreshToken()).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyODQ2ODliZi0xYzcyLTRjZmEtYmYwNC00Nzk1MmM4Mzk3NzkiLCJpYXQiOjE2NDI1NDg1ODR9.JsdrEASBRnD4HbZC6Iuri96tC_4Pc_AUXUeiBpgJXBM");
    expect(service.getUserRole()).toBe(UserRole.admin);
    expect(service.getUserId()).toBe("284689bf-1c72-4cfa-bf04-47952c839779");
  });
});
