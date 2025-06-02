import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHeaderMessageComponent } from './staff-header-message.component';

describe('StaffHeaderMessageComponent', () => {
  let component: StaffHeaderMessageComponent;
  let fixture: ComponentFixture<StaffHeaderMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffHeaderMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffHeaderMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
