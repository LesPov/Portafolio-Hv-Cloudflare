import { TestBed } from '@angular/core/testing';

import { SocialCardHoverService } from './social-card-hover.service';

describe('SocialCardHoverService', () => {
  let service: SocialCardHoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialCardHoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
