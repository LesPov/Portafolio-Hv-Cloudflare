import { TestBed } from '@angular/core/testing';

import { MobileAnimationsService } from './mobile-animations.service';

describe('MobileAnimationsService', () => {
  let service: MobileAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
