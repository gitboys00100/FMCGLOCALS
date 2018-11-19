import { TestBed, inject } from '@angular/core/testing';

import { RefreshDataService } from './refresh-data.service';

describe('RefreshDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshDataService]
    });
  });

  it('should be created', inject([RefreshDataService], (service: RefreshDataService) => {
    expect(service).toBeTruthy();
  }));
});
