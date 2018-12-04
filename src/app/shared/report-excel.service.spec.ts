import { TestBed, inject } from '@angular/core/testing';

import { ReportExcelService } from './report-excel.service';

describe('ReportExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportExcelService]
    });
  });

  it('should be created', inject([ReportExcelService], (service: ReportExcelService) => {
    expect(service).toBeTruthy();
  }));
});
