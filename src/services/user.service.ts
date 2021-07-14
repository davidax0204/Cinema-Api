import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const db = environment.NODEJS_SERVER;

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

  // isLoged(): boolean {
  //   let authFlag: boolean;

  //   this.http.post(db + '/isLoged', { localStorage }).subscribe(
  //     (res) => {
  //       authFlag = true;
  //     },
  //     (error) => {
  //       authFlag = false;
  //     }
  //   );

  //   return authFlag;
  // }

  addUser(user: User) {
    return this.http.post(db + '/sign-up', { user, localStorage });
  }

  getUser() {
    return this.http.post(db + '/read-profile', { localStorage });
  }

  loginUser(email, password) {
    return this.http.post(db + '/sign-in', { email, password });
  }

  userProfile() {
    return this.http.post(db + '/profile', { localStorage });
  }

  editUser(user: User) {
    return this.http.post(db + '/profile-edit', { localStorage, user });
  }

  logOutUser() {
    return this.http.post(db + '/profile/logOut', { localStorage });
  }
}
