import { TestBed } from '@angular/core/testing';

import { TicketHoverService } from './ticket-hover.service';

describe('TicketHoverService', () => {
  let service: TicketHoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketHoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
