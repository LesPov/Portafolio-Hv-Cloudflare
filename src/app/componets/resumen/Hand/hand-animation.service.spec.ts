import { TestBed } from '@angular/core/testing';

import { HandAnimationService } from './hand-animation.service';

describe('HandAnimationService', () => {
  let service: HandAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
