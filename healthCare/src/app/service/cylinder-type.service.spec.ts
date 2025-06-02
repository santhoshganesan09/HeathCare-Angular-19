import { TestBed } from '@angular/core/testing';

import { CylinderTypeService } from './cylinder-type.service';

describe('CylinderTypeService', () => {
  let service: CylinderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CylinderTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
