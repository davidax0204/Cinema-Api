import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-dashboard-teathers',
  templateUrl: './admin-dashboard-teathers.component.html',
  styleUrls: ['./admin-dashboard-teathers.component.css'],
})
export class AdminDashboardTeathersComponent implements OnInit {
  teathers: [];
  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.AdminService.getTeathers().subscribe((res: any) => {
      this.teathers = res;
    });
  }

  deleteTeather(teatherId) {
    this.AdminService.removeTeather(teatherId).subscribe((res: any) => {
      this.teathers = res;
    });
  }

  getMovieName(movieId) {
    this.AdminService.getMovie(movieId).subscribe((res) => {
      console.log(res);
    });
  }
}
