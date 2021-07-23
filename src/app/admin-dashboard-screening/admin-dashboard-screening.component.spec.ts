import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardScreeningComponent } from './admin-dashboard-screening.component';

describe('AdminDashboardScreeningComponent', () => {
  let component: AdminDashboardScreeningComponent;
  let fixture: ComponentFixture<AdminDashboardScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
