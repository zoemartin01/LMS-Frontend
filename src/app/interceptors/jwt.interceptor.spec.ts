import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor,
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
