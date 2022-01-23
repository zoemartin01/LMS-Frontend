import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { UnauthorizedInterceptor } from './unauthorized.interceptor';

import { AuthService } from "../services/auth.service";

class MockAuthService {
  isUserLoggedIn() {
    return true;
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);
  }

  getAccessToken() {
    return <string>localStorage.getItem(environment.storageKeys.accessToken);
  }

  tokenRefresh(): Observable<{ accessToken: string }> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error(
          new HttpErrorResponse({
            status: 400,
          })
        );
      }

      let accessToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQwMDcwNzAsInVzZXJJZCI6IjlkNzk1NTJhLWVjYzQtNGI4NS1hZWI0LTk2ZDhkOGUxMTQxOCIsImlhdCI6MTY0Mjg1NTA3MH0.s2fqQ58-hNMitLRfTqFQCBAM1mlAneuWSrTdYsUl9RQ";

      observer.next({ accessToken });
    });
  }
}

describe('UnauthorizedInterceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: UnauthorizedInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnauthorizedInterceptor,
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });

    interceptor = TestBed.inject(UnauthorizedInterceptor);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g";
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should do nothing if no error happens', fakeAsync(() => {
    let handleUnauthorizedMethod = spyOn<any>(interceptor,'handleUnauthorized');

    const next: any = {
      handle: () => {
        return new Observable((observer) => {
          observer.complete();
        });
      }
    };

    const testRequest = new HttpRequest('GET', '/test');

    let isError = false;
    interceptor.intercept(testRequest, next).subscribe({
      error: () => {
        isError = true;
      }
    });

    tick();

    expect(handleUnauthorizedMethod).not.toHaveBeenCalled();
    expect(isError).toBe(false);
  }));

  it('catch error with other http status code than 401', function () {
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return new Observable((observer) => {
          if (request.url === "/test" && request.headers.get('Authorization') !== "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQwMDcwNzAsInVzZXJJZCI6IjlkNzk1NTJhLWVjYzQtNGI4NS1hZWI0LTk2ZDhkOGUxMTQxOCIsImlhdCI6MTY0Mjg1NTA3MH0.s2fqQ58-hNMitLRfTqFQCBAM1mlAneuWSrTdYsUl9RQ") {
            observer.error(
              new HttpErrorResponse({
                status: 400,
              })
            );
          }
          observer.complete();
        });
      }
    };

    const testRequest = new HttpRequest('GET', '/test');

    interceptor.intercept(testRequest, next).subscribe({
      next: (event: HttpEvent<any>) => {
      },
      error: err => {
      }
    });
  });

  it('catch error with other http status code than 401', fakeAsync(() => {
    let handleUnauthorizedMethod = spyOn<any>(interceptor,'handleUnauthorized');

    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return new Observable((observer) => {
          if (request.url === "/test" && request.headers.get('Authorization') !== "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQwMDcwNzAsInVzZXJJZCI6IjlkNzk1NTJhLWVjYzQtNGI4NS1hZWI0LTk2ZDhkOGUxMTQxOCIsImlhdCI6MTY0Mjg1NTA3MH0.s2fqQ58-hNMitLRfTqFQCBAM1mlAneuWSrTdYsUl9RQ") {
            observer.error(
              new HttpErrorResponse({
                status: 400,
              })
            );
          }
          observer.complete();
        });
      }
    };

    const testRequest = new HttpRequest('GET', '/test');

    let isError = false;
    interceptor.intercept(testRequest, next).subscribe({
      error: () => {
        isError = true;
      }
    });

    tick();

    expect(handleUnauthorizedMethod).not.toHaveBeenCalled();
    expect(isError).toBe(true);
  }));

  it('should catch 401 and logout when refresh fails', fakeAsync(() => {
    localStorage.setItem('hasValue', 'true');

    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return new Observable((observer) => {
          if (request.headers.get('Authorization') !== "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQwMDcwNzAsInVzZXJJZCI6IjlkNzk1NTJhLWVjYzQtNGI4NS1hZWI0LTk2ZDhkOGUxMTQxOCIsImlhdCI6MTY0Mjg1NTA3MH0.s2fqQ58-hNMitLRfTqFQCBAM1mlAneuWSrTdYsUl9RQ"
            && localStorage.getItem('hasValue') === 'true') {
            observer.error(
              new HttpErrorResponse({
                status: 401,
              })
            );
          }
          observer.complete();
        });
      }
    };

    const testRequest = new HttpRequest('GET', `${environment.baseUrl}${environment.apiRoutes.auth.tokenRefresh}`);

    interceptor.intercept(testRequest, next).subscribe();

    tick();

    expect(localStorage.getItem(environment.storageKeys.accessToken)).toBe(null);
  }));

  it('should catch 401 and then catch error on handling', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return new Observable((observer) => {
          if (request.headers.get('Authorization') !== "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQwMDcwNzAsInVzZXJJZCI6IjlkNzk1NTJhLWVjYzQtNGI4NS1hZWI0LTk2ZDhkOGUxMTQxOCIsImlhdCI6MTY0Mjg1NTA3MH0.s2fqQ58-hNMitLRfTqFQCBAM1mlAneuWSrTdYsUl9RQ") {
            observer.error(
              new HttpErrorResponse({
                status: 401,
              })
            );
          }
          observer.complete();
        });
      }
    };

    const testRequest = new HttpRequest('GET', '/test');

    let isError: boolean = false;
    interceptor.intercept(testRequest, next).subscribe({
      error: () => {
        isError = true;
      }
    });

    tick();

    expect(isError).toBe(true);
  }));
});
