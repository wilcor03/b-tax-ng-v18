import { TestBed } from '@angular/core/testing';

import { BceService } from './bce.service';

describe('BceService', () => {
  let service: BceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
