import { TestBed } from '@angular/core/testing';

import { GroupTaskService } from './group-task.service';

describe('GroupTaskService', () => {
  let service: GroupTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
