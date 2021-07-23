import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateScreeningComponent } from './admin-create-screening.component';

describe('AdminCreateScreeningComponent', () => {
  let component: AdminCreateScreeningComponent;
  let fixture: ComponentFixture<AdminCreateScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
