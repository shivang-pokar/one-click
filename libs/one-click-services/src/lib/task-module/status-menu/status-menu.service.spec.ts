import { TestBed } from '@angular/core/testing';

import { StatusMenuService } from './status-menu.service';

describe('StatusMenuService', () => {
  let service: StatusMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
