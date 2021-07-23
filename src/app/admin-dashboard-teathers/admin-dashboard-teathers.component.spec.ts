import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTeathersComponent } from './admin-dashboard-teathers.component';

describe('AdminDashboardTeathersComponent', () => {
  let component: AdminDashboardTeathersComponent;
  let fixture: ComponentFixture<AdminDashboardTeathersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardTeathersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardTeathersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
