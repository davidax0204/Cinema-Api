import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardMoviesComponent } from './admin-dashboard-movies.component';

describe('AdminDashboardMoviesComponent', () => {
  let component: AdminDashboardMoviesComponent;
  let fixture: ComponentFixture<AdminDashboardMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
