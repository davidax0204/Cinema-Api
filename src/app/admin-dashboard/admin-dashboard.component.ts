import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.nodel';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[];

  constructor(
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AdminService.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  onDeleteUserButton(id) {
    console.log(this.users);
    this.AdminService.deleteUser(id).subscribe((res) => {
      this.AdminService.getAllUsers().subscribe((res: any) => {
        this.users = res;
      });
    });
  }
}
