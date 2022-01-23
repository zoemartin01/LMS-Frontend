import { TestBed } from '@angular/core/testing';
import { HttpRequest } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable  } from "rxjs";
import { environment } from "../../environments/environment";

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });

    interceptor = TestBed.inject(JwtInterceptor);
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add a Bearer token to request', () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI1NTE0NjksInVzZXJJZCI6IjI4NDY4OWJmLTFjNzItNGNmYS1iZjA0LTQ3OTUyYzgzOTc3OSIsImlhdCI6MTY0MjU1MDI2OX0.iyLvkH0dvYH9NrB7C2AZUNromKVR1t1ZQqGoKnx0m4g";
    localStorage.setItem(environment.storageKeys.accessToken, accessToken);

    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.complete();
        });
      }
    };

    const mockRequest = new HttpRequest('GET', '/test');
    expect(mockRequest.headers.get('Authorization')).toBe(null);

    interceptor.intercept(mockRequest, next).subscribe(() => {
      expect(mockRequest.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    });
  });

  it('should do nothing when no access token is present', () => {
    localStorage.clear();

    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.complete();
        });
      }
    };

    const mockRequest = new HttpRequest('GET', '/test');
    expect(mockRequest.headers.get('Authorization')).toBe(null);

    interceptor.intercept(mockRequest, next).subscribe(() => {
      expect(mockRequest.headers.get('Authorization')).toBe(null);
    });
  });
});
