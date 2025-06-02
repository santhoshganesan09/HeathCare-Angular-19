import { TestBed } from '@angular/core/testing';

import { DefectReportService } from './defect-report.service';

describe('DefectReportService', () => {
  let service: DefectReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefectReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
