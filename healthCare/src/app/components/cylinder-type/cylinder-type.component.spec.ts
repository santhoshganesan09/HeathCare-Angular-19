import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderTypeComponent } from './cylinder-type.component';

describe('CylinderTypeComponent', () => {
  let component: CylinderTypeComponent;
  let fixture: ComponentFixture<CylinderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CylinderTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CylinderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
