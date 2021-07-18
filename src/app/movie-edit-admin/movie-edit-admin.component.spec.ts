import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEditAdminComponent } from './movie-edit-admin.component';

describe('MovieEditAdminComponent', () => {
  let component: MovieEditAdminComponent;
  let fixture: ComponentFixture<MovieEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
