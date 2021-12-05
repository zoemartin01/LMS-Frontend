import { TestBed } from '@angular/core/testing';

import { GobalSettingsService } from './gobal-settings.service';

describe('GobalSettingsService', () => {
  let service: GobalSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GobalSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
