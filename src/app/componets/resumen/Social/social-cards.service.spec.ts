import { TestBed } from '@angular/core/testing';

import { SocialCardsService } from './social-cards.service';

describe('SocialCardsService', () => {
  let service: SocialCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
