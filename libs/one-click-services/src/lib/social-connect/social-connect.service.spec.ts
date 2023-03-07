import { TestBed } from '@angular/core/testing';

import { SocialConnectService } from './social-connect.service';

describe('SocialConnectService', () => {
  let service: SocialConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
