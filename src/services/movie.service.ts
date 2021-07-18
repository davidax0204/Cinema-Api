import { Injectable } from '@angular/core';
import { User } from '../models/user.nodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const db = environment.NODEJS_SERVER;

@Injectable()
export class MovieService {
  constructor(private http: HttpClient, private router: Router) {}

  getBooks() {
    return this.http.get(db + '/movies');
  }
}