import { TestBed, inject } from '@angular/core/testing';

import { Md5HasherService } from './md5-hasher.service';

describe('Md5HasherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Md5HasherService]
    });
  });

  it('should be created', inject([Md5HasherService], (service: Md5HasherService) => {
    expect(service).toBeTruthy();
  }));
});
