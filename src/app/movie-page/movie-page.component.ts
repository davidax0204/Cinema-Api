import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  movieId;
  name;
  writer;
  genre;
  production;
  description;
  length;
  ticketPrice;
  img;
  seats: [];

  constructor(
    private AdminService: AdminService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: any) => {
      this.movieId = params.id;
      this.AdminService.getBook(this.movieId).subscribe((res: any) => {
        this.name = res.name;
        this.writer = res.writer;
        this.genre = res.genre;
        this.production = res.production;
        this.description = res.description;
        this.length = res.length;
        this.ticketPrice = res.ticketPrice;
        this.img = res.img;
        this.seats = res.seats;
      });
      console.log(this.name);
    });
  }
}
