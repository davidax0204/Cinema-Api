import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/models/movie.model';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-movie-edit-admin',
  templateUrl: './movie-edit-admin.component.html',
  styleUrls: ['./movie-edit-admin.component.css'],
})
export class MovieEditAdminComponent implements OnInit {
  editForm: FormGroup;
  name;
  writer;
  genre;
  production;
  description;
  Length;
  price;
  img;

  submitError;
  msg;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    });

    this.name = this.editForm.get('name');
    this.writer = this.editForm.get('writer');
    this.genre = this.editForm.get('genre');
    this.production = this.editForm.get('production');
    this.description = this.editForm.get('description');
    this.Length = this.editForm.get('Length');
    this.price = this.editForm.get('price');
    this.img = this.editForm.get('img');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);

      // this.AdminService.getUser(params.id).subscribe((res: any) => {
      //   this.profilePage.controls['firstName'].setValue(res.firstName);
      //   this.profilePage.controls['lastName'].setValue(res.lastName);
      //   this.profilePage.controls['age'].setValue(res.age);
      //   this.profilePage.controls['email'].setValue(res.email);
      // });
    });
  }

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

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.editForm.valid) {
      const newMovie: Movie = {
        name: this.name.value,
        writer: this.writer.value,
        genre: this.genre.value,
        production: this.production.value,
        description: this.description.value,
        length: this.Length.value,
        ticketPrice: this.price.value,
        img: this.img.value,
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