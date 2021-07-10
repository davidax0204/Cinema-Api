import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const db = 'http://localhost:3000';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getHello() {
    this.http.get(db).subscribe((res) => {
      console.log(res);
    });
  }

  // sendHello() {
  //   this.http.post(db, { text: 'Working' }).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  private _users: User[] = [
    {
      firstName: 'David',
      lastName: 'Axelrod',
      age: 22,
      email: 'davidax5625@gmail.com',
      password: 'david0204',
    },
    {
      firstName: 'Eliza',
      lastName: 'Axelrod',
      age: 22,
      email: 'elizaax5625@gmail.com',
      password: 'eliza0204',
    },
  ];

  get users() {
    return [...this._users];
  }

  addUser(user: User) {
    this.http.post(db, user).subscribe(
      (res) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.router.navigate(['/user/sign-up', { error: 'from here error' }]);
      }
    );
  }
}
