import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderListComponent } from './cylinder-list.component';

describe('CylinderListComponent', () => {
  let component: CylinderListComponent;
  let fixture: ComponentFixture<CylinderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CylinderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CylinderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
