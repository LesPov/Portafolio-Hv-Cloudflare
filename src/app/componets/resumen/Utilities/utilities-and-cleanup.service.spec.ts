import { TestBed } from '@angular/core/testing';

import { UtilitiesAndCleanupService } from './utilities-and-cleanup.service';

describe('UtilitiesAndCleanupService', () => {
  let service: UtilitiesAndCleanupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesAndCleanupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
