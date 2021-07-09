import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getHello() {
    this.http.get('http://localhost:3000').subscribe((res) => {
      console.log(res);
    });
  }

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
    this._users.push(user);
  }
}
