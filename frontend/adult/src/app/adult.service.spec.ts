import { TestBed, inject } from '@angular/core/testing';

import { AdultService } from './adult.service';

describe('AdultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdultService]
    });
  });

  it('should be created', inject([AdultService], (service: AdultService) => {
    expect(service).toBeTruthy();
  }));
});
