import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDefectReportComponent } from './staff-defect-report.component';

describe('StaffDefectReportComponent', () => {
  let component: StaffDefectReportComponent;
  let fixture: ComponentFixture<StaffDefectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDefectReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDefectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
