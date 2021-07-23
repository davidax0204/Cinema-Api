import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { Teather } from 'src/models/teather.model';
import { User } from 'src/models/user.nodel';
import { AdminService } from 'src/services/admin.service';
import { MovieService } from 'src/services/movie.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movieList: Movie[];
  teathers: [];

  constructor(private MovieService: MovieService) {}

  ngOnInit(): void {
    this.MovieService.getTeathers().subscribe((res: any) => {
      this.teathers = res;
    });
    this.MovieService.getBooks().subscribe((res: any) => {
      this.movieList = res;
    });
  }

  showTeatherMovie(movieId) {
    this.MovieService.getMoviesFromTeather(movieId).subscribe((res: any) => {
      this.movieList = res;
    });
  }
}
