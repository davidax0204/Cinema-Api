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

  isOccupied(seatNumber, movieId) {
    return this.http.post(db + '/movie-seat-color', { seatNumber, movieId });
  }

  getTeathers() {
    return this.http.get(db + '/teathers');
  }

  getMoviesFromTeather(teatherId) {
    return this.http.post(db + '/teather-movies', { teatherId });
  }

  getScreening(movieId) {
    return this.http.post(db + '/getTeather', { movieId });
  }
}
