import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { MovieService } from 'src/services/movie.service';

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
  seats: any[];

  selectedSeats: any[] = [];

  constructor(
    private AdminService: AdminService,
    private activeRouter: ActivatedRoute,
    private MovieService: MovieService
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
    });
  }

  isOccupied(seatNumber) {
    if (this.seats) {
      if (this.seats[seatNumber - 1].occupied) {
        return 'occupied';
      } else {
        return '';
      }
    }
  }

  selectSeat(seatNumber) {
    console.log('before', this.selectedSeats);
    if (this.seats) {
      if (!this.seats[seatNumber - 1].occupied) {
        if (this.selectedSeats.includes(seatNumber)) {
          const index = this.selectedSeats.indexOf(seatNumber);
          if (index > -1) {
            this.selectedSeats.splice(index, 1);
          }
          console.log('after delete', this.selectedSeats);
          return false;
        } else {
          this.selectedSeats.push(seatNumber);
          console.log('after adding', this.selectedSeats);
          return true;
        }
      }
    }
  }
}
