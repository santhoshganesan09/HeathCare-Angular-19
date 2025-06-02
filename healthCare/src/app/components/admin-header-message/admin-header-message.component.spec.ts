import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderMessageComponent } from './admin-header-message.component';

describe('AdminHeaderMessageComponent', () => {
  let component: AdminHeaderMessageComponent;
  let fixture: ComponentFixture<AdminHeaderMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeaderMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeaderMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
