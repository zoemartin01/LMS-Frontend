import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";

import { LivecamService } from './livecam.service';

describe('LivecamService', () => {
  let service: LivecamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    });
    service = TestBed.inject(LivecamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
