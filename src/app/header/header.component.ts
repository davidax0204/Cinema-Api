import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean;
  isAdminLoggedSub: Subscription;

  constructor(
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  private fun(flag: boolean) {
    this.ngZone.run(() => (this.isAdmin = flag));
  }

  ngOnInit(): void {
    this.AdminService.isAdmin().subscribe(
      (res) => {
        this.fun(true);
        console.log('yes');
      },
      (error) => {
        this.fun(false);
      }
    );

    // this.isAdminLoggedSub = this.AdminService.isAdminLogged.subscribe(
    //   (isAdminLogged) => {
    //     this.isAdmin = isAdminLogged;
    //   }
    // );
  }

  // ngOnDestroy() {
  //   this.isAdminLoggedSub.unsubscribe();
  // }

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
