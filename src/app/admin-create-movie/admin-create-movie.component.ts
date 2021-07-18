import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  submitError;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
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

  // invalidLastNameMessage() {
  //   if (this.lastName.errors?.required) {
  //     return 'You must enter a last name';
  //   }
  //   if (this.lastName.errors?.lastNameLettersError) {
  //     return 'You must enter letters only';
  //   }
  // }

  // invalidAgeMessage() {
  //   if (this.age.errors?.required) {
  //     return 'You must enter your age';
  //   }
  //   if (this.age.errors?.min) {
  //     return 'You must be at least 10 years old to signup.';
  //   }
  // }

  // invalidEmailMessage() {
  //   if (this.email.errors?.required) {
  //     return 'You must enter an Email';
  //   }
  //   if (this.email.errors?.email) {
  //     return 'You must enter a valid Email';
  //   }
  // }

  // invalidPassword() {
  //   if (this.password.errors?.required) {
  //     return 'You must enter a password';
  //   }
  //   if (this.password.errors?.passwordinvalid) {
  //     return 'A password must contain digits and no spaces';
  //   }
  // }

  // invalidPsswordRepeatedMessage() {
  //   if (this.passwordRepeated.errors?.required) {
  //     return 'You must repeat on the password';
  //   }

  //   if (this.signUpForm.errors?.passwordnotrepeated) {
  //     return 'Two passwords must ne identical.';
  //   }
  // }

  // passwordRepeatedValidator(control: FormGroup): ValidationErrors | null {
  //   const password = control.get('password').value;
  //   const passwordRepeated = control.get('passwordRepeated').value;
  //   return password !== passwordRepeated ? { passwordnotrepeated: true } : null;
  // }

  // passwordValidator(control: AbstractControl): ValidationErrors | null {
  //   const isIncludesWhiteSpace = control.value.includes(' ');
  //   const isIncludesDigits = /\d/.exec(control.value);
  //   const invalid = !isIncludesDigits || isIncludesWhiteSpace;
  //   return invalid ? { passwordinvalid: true } : null;
  // }

  // nameValidator(control: AbstractControl): ValidationErrors | null {
  //   return !/^[a-zA-Z\s]*$/.test(control.value)
  //     ? { firstNameLettersError: true }
  //     : null;
  // }

  // lastNameValidator(control: AbstractControl): ValidationErrors | null {
  //   return !/^[a-zA-Z\s]*$/.test(control.value)
  //     ? { lastNameLettersError: true }
  //     : null;
  // }

  // onClickCloseModal() {
  //   this.isModalOpen = false;
  // }

  submitForm() {}
}
