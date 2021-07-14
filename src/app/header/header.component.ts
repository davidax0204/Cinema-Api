import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {}

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
}
