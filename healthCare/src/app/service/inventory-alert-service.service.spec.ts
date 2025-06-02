import { TestBed } from '@angular/core/testing';

import { InventoryAlertServiceService } from './inventory-alert-service.service';

describe('InventoryAlertServiceService', () => {
  let service: InventoryAlertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryAlertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
