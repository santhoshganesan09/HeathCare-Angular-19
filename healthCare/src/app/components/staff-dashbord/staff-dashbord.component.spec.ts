import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashbordComponent } from './staff-dashbord.component';

describe('StaffDashbordComponent', () => {
  let component: StaffDashbordComponent;
  let fixture: ComponentFixture<StaffDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
