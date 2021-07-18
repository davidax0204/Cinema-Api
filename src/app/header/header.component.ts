import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AdminService.isAdmin().subscribe(
      (res) => {
        this.isAdmin = true;
      },
      (error) => {
        this.isAdmin = false;
      }
    );
  }

  onClickProfileButton() {
    this.UserService.userProfile().subscribe(
      (res) => {
        this.router.navigate(['/user/profile']);
      },
      (error) => {
        this.router.navigate(['/user']);
      }
    );
  }

  onClickAdminLogOut() {
    this.AdminService.logOutAdmin().subscribe((res) => {
      this.isAdmin = false;
      localStorage.setItem('token', '');
      this.router.navigate(['/user']);
    });
  }
}
