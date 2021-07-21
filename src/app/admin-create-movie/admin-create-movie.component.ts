import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/models/movie.model';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-create-movie',
  templateUrl: './admin-create-movie.component.html',
  styleUrls: ['./admin-create-movie.component.css'],
})
export class AdminCreateMovieComponent implements OnInit {
  editForm: FormGroup;
  name;
  writer;
  genre;
  production;
  description;
  Length;
  price;
  img;
  locations;
  times;

  submitError;
  msg;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      writer: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      production: ['', [Validators.required]],
      description: ['', [Validators.required]],
      Length: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      img: ['', Validators.required],
      locations: ['', Validators.required],
      times: ['', Validators.required],
    });

    this.name = this.editForm.get('name');
    this.writer = this.editForm.get('writer');
    this.genre = this.editForm.get('genre');
    this.production = this.editForm.get('production');
    this.description = this.editForm.get('description');
    this.Length = this.editForm.get('Length');
    this.price = this.editForm.get('price');
    this.img = this.editForm.get('img');
    this.locations = this.editForm.get('locations');
    this.times = this.editForm.get('times');
  }

  ngOnInit(): void {}

  invalidNameMessage() {
    if (this.name.errors?.required) {
      return 'You must enter a movie name';
    }
  }

  invalidWriterMessage() {
    if (this.writer.errors?.required) {
      return 'You must enter a movie writer';
    }
  }

  invalidGenreMessage() {
    if (this.genre.errors?.required) {
      return 'You must enter a movie genre';
    }
  }

  invalidProductionMessage() {
    if (this.production.errors?.required) {
      return 'You must enter a movie production';
    }
  }

  invalidDescriptionMessage() {
    if (this.description.errors?.required) {
      return 'You must enter a movie description';
    }
  }
  invalidLengthMessage() {
    if (this.Length.errors?.required) {
      return 'You must enter a movie length';
    }
  }

  invalidPriceMessage() {
    if (this.price.errors?.required) {
      return 'You must enter a movie price';
    }
    if (this.price.errors?.min) {
      return 'The price must be greater than 0';
    }
  }

  invalidiImgMessage() {
    if (this.img.errors?.required) {
      return 'You must enter a image URL';
    }
  }

  invalidLocationMessage() {
    if (this.locations.errors?.required) {
      return 'You must enter a movie locations';
    }
  }

  invalidTimesMessage() {
    if (this.times.errors?.required) {
      return 'You must enter a movie times';
    }
  }

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.editForm.valid) {
      let locationArray: any[];
      locationArray = this.locations.value.split(',', this.locations.length);
      let timeArray: any[];
      timeArray = this.times.value.split(',', this.times.length);
      const newMovie: Movie = {
        name: this.name.value,
        writer: this.writer.value,
        genre: this.genre.value,
        production: this.production.value,
        description: this.description.value,
        length: this.Length.value,
        ticketPrice: this.price.value,
        img: this.img.value,
        locations: locationArray,
        times: timeArray,
      };
      this.AdminService.addMovie(newMovie).subscribe(
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
