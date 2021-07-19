import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const db = environment.NODEJS_SERVER;

@Injectable()
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  adminLogIn(email, password) {
    return this.http.post(db + '/admin/sign-in', { email, password });
  }

  getAllUsers() {
    return this.http.post(db + '/admin/users', { localStorage });
  }

  getUser(id) {
    return this.http.post(db + '/admin/getUser', { id, localStorage });
  }

  getMovie(id) {
    return this.http.post(db + '/admin/getMovie', { id, localStorage });
  }

  changeUserInfo(userData, id) {
    return this.http.post(db + '/admin/changeUser', {
      id,
      userData,
      localStorage,
    });
  }

  deleteUser(id) {
    return this.http.post(db + '/admin/deleteUser', { id, localStorage });
  }

  deleteMovie(id) {
    return this.http.post(db + '/admin/deleteMovie', { id, localStorage });
  }

  isAdmin() {
    return this.http.post(db + '/admin/isAdmin', { localStorage });
  }

  logOutAdmin() {
    return this.http.post(db + '/admin/logout', { localStorage });
  }

  addMovie(movie) {
    return this.http.post(db + '/admin/add-movie', { localStorage, movie });
  }

  changeMovieInfo(editedMovieData, id) {
    return this.http.post(db + '/admin/changeMovie', {
      id,
      localStorage,
      editedMovieData,
    });
  }

  getBooks() {
    return this.http.get(db + '/books');
  }
}
