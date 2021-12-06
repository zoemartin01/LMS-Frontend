import { TestBed } from '@angular/core/testing';

import { LivecamService } from './livecam.service';

describe('LivecamService', () => {
  let service: LivecamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivecamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
