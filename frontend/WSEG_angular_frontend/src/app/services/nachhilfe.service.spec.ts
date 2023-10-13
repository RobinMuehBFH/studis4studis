import { TestBed } from '@angular/core/testing';

import { NachhilfeService } from './nachhilfe.service';

describe('NachhilfeService', () => {
  let service: NachhilfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NachhilfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
