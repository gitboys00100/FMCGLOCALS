import { TestBed, inject } from '@angular/core/testing';

import { GetRetailersService } from './get-retailers.service';

describe('GetRetailersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRetailersService]
    });
  });

  it('should be created', inject([GetRetailersService], (service: GetRetailersService) => {
    expect(service).toBeTruthy();
  }));
});
