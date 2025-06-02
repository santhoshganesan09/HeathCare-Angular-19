import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvventoryAlertComponent } from './invventory-alert.component';

describe('InvventoryAlertComponent', () => {
  let component: InvventoryAlertComponent;
  let fixture: ComponentFixture<InvventoryAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvventoryAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvventoryAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
