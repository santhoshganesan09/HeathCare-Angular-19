import { TestBed } from '@angular/core/testing';

import { CylinderService } from './cylinder.service';

describe('CylinderService', () => {
  let service: CylinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CylinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
