import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { UnauthorizedInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedInterceptor,
    ],
    imports: [
      HttpClientModule,
      RouterTestingModule,
    ],
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedInterceptor = TestBed.inject(UnauthorizedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
