import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-dashboard-screening',
  templateUrl: './admin-dashboard-screening.component.html',
  styleUrls: ['./admin-dashboard-screening.component.css'],
})
export class AdminDashboardScreeningComponent implements OnInit {
  screenings: [];
  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    // this.AdminService.getTeathers().subscribe((res: any) => {
    //   this.screenings = res;
    // });
    this.AdminService.getScreenings().subscribe((res: any) => {
      this.screenings = res;
    });
  }

  deleteScreening(screeningId) {
    this.AdminService.removeScreening(screeningId).subscribe((res: any) => {
      this.screenings = res;
    });
  }
}
