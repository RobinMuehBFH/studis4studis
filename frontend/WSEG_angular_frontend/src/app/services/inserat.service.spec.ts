import { TestBed } from '@angular/core/testing';

import { InseratService } from './inserat.service';

describe('InseratService', () => {
  let service: InseratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InseratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
