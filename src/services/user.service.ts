import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const db = environment.NODEJS_SERVER;

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

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

  orderTickets(selectedSeats, selectedTime, selectedLocation, movieId) {
    return this.http.post(db + '/buyTickets', {
      localStorage,
      selectedSeats,
      selectedTime,
      selectedLocation,
      movieId,
    });
  }
}
