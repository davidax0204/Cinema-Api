import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.nodel';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usersToDisplay: User[];
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.usersToDisplay = [...this.UserService.users];
  }
}
