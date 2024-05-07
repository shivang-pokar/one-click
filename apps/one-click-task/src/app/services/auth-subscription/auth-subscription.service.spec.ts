import { TestBed } from '@angular/core/testing';

import { AuthSubscriptionService } from './auth-subscription.service';

describe('AuthSubscriptionService', () => {
  let service: AuthSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
