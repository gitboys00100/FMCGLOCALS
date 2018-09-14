import { TestBed, inject } from '@angular/core/testing';

import { StockTransferOrdersService } from './stock-transfer-orders.service';

describe('StockTransferOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockTransferOrdersService]
    });
  });

  it('should be created', inject([StockTransferOrdersService], (service: StockTransferOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
