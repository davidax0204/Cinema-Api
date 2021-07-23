import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teather } from 'src/models/teather.model';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-create-teather',
  templateUrl: './admin-create-teather.component.html',
  styleUrls: ['./admin-create-teather.component.css'],
})
export class AdminCreateTeatherComponent implements OnInit {
  createTeatherForm: FormGroup;
  name;
  seats;
  movies;

  submitError;
  msg;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router
  ) {
    this.createTeatherForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      seats: ['10', [Validators.required, Validators.min(10)]],
      movies: ['', [Validators.required]],
    });

    this.name = this.createTeatherForm.get('name');
    this.seats = this.createTeatherForm.get('seats');
    this.movies = this.createTeatherForm.get('movies');
  }

  ngOnInit(): void {}

  invalidNameMessage() {
    if (this.name.errors?.required) {
      return 'You must enter a movie name';
    }
  }

  invalidSeatsMessage() {
    if (this.seats.errors?.required) {
      return 'You must enter a movie seats';
    }
    if (this.seats.errors?.min) {
      return 'You must enter at least 10 seats';
    }
  }

  invalidMoviesMessage() {
    if (this.movies.errors?.required) {
      return 'You must enter movies';
    }
  }

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.createTeatherForm.valid) {
      let moviesArray: any[];
      moviesArray = this.movies.value.split(',', this.movies.length);
      console.log(moviesArray);

      const newTeather: Teather = {
        name: this.name.value,
        seats: this.seats.value,
        movies: moviesArray,
      };
      this.AdminService.addTeather(newTeather).subscribe(
        (res) => {
          this.isModalOpen = true;
          this.msg = 'saved';
        },
        (error) => {
          this.isModalOpen = true;
          this.msg = 'The title must be unique';
        }
      );
    }
  }
}
