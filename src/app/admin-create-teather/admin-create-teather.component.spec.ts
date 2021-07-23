import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTeatherComponent } from './admin-create-teather.component';

describe('AdminCreateTeatherComponent', () => {
  let component: AdminCreateTeatherComponent;
  let fixture: ComponentFixture<AdminCreateTeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateTeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
