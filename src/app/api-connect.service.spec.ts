import { TestBed } from '@angular/core/testing';

import { ApiConnectService } from './api-connect.service';

describe('ApiConnectService', () => {
  let service: ApiConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
