import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { AdminService } from 'src/services/admin.service';
import { MovieService } from 'src/services/movie.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-dashboard-movies',
  templateUrl: './admin-dashboard-movies.component.html',
  styleUrls: ['./admin-dashboard-movies.component.css'],
})
export class AdminDashboardMoviesComponent implements OnInit {
  movieList: Movie[];

  constructor(
    private UserService: UserService,
    private MovieService: MovieService,
    private AdminService: AdminService
  ) {}

  ngOnInit(): void {
    this.MovieService.getBooks().subscribe((res: any) => {
      this.movieList = res;
    });
  }

  onDeleteMovieButton(id) {
    this.AdminService.deleteMovie(id).subscribe();
  }
}
