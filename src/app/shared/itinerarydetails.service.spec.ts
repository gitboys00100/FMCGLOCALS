import { TestBed, inject } from '@angular/core/testing';

import { ItinerarydetailsService } from './itinerarydetails.service';

describe('ItinerarydetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItinerarydetailsService]
    });
  });

  it('should be created', inject([ItinerarydetailsService], (service: ItinerarydetailsService) => {
    expect(service).toBeTruthy();
  }));
});
