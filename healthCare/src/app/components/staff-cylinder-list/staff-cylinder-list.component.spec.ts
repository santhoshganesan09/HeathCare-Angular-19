import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCylinderListComponent } from './staff-cylinder-list.component';

describe('StaffCylinderListComponent', () => {
  let component: StaffCylinderListComponent;
  let fixture: ComponentFixture<StaffCylinderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCylinderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCylinderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
