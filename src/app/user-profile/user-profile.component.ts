import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.nodel';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profilePage: FormGroup;
  firstName;
  lastName;
  age;
  email;
  password;
  passwordRepeated;

  isModalOpen = false;
  msg;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.profilePage = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, this.firstNameValidator]],
        lastName: ['', [Validators.required, this.lastNameValidator]],
        age: ['', [Validators.required, Validators.min(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', this.passwordValidator],
        passwordRepeated: [''],
      },
      {
        validators: this.passwordRepeatedValidator,
      }
    );

    this.firstName = this.profilePage.get('firstName');
    this.lastName = this.profilePage.get('lastName');
    this.age = this.profilePage.get('age');
    this.email = this.profilePage.get('email');
    this.password = this.profilePage.get('password');
    this.passwordRepeated = this.profilePage.get('passwordRepeated');
  }

  ngOnInit(): void {
    this.UserService.getUser().subscribe(
      (res: any) => {
        this.profilePage.controls['firstName'].setValue(res.firstName);
        this.profilePage.controls['lastName'].setValue(res.lastName);
        this.profilePage.controls['age'].setValue(res.age);
        this.profilePage.controls['email'].setValue(res.email);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  invalidFirstNameMessage() {
    if (this.firstName.errors?.required) {
      return 'You must enter your first name';
    }
    if (this.firstName.errors?.firstNameLettersError) {
      return 'Your first name must contain letters only';
    }
  }
  invalidLastNameMessage() {
    if (this.lastName.errors?.required) {
      return 'You must enter your last name';
    }
    if (this.lastName.errors?.lastNameLettersError) {
      return 'Your last name must contain letters only';
    }
  }

  invalidAgeMessage() {
    if (this.age.errors?.required) {
      return 'You must your age';
    }
    if (this.age.errors?.min) {
      return 'You must be at least 10 years old to signup.';
    }
  }

  invalidEmailMessage() {
    if (this.email.errors?.required) {
      return 'You must enter an Email';
    }
    if (this.email.errors?.email) {
      return 'You must enter a valid Email';
    }
  }

  invalidPassword() {
    if (this.password.errors?.passwordinvalid) {
      return 'A password must contain digits and no spaces';
    }
  }

  invalidPsswordRepeatedMessage() {
    if (this.passwordRepeated.errors?.required) {
      return 'You must repeat on the password';
    }

    if (this.profilePage.errors?.passwordnotrepeated) {
      return 'Two passwords must be identical.';
    }
  }

  passwordRepeatedValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const passwordRepeated = control.get('passwordRepeated').value;
    return password !== passwordRepeated ? { passwordnotrepeated: true } : null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0) {
      return null;
    }
    const isIncludesWhiteSpace = control.value.includes(' ');
    const isIncludesDigits = /\d/.exec(control.value);
    const invalid = !isIncludesDigits || isIncludesWhiteSpace;
    return invalid ? { passwordinvalid: true } : null;
  }

  firstNameValidator(control: AbstractControl): ValidationErrors | null {
    return !/^[a-zA-Z\s]*$/.test(control.value)
      ? { firstNameLettersError: true }
      : null;
  }

  lastNameValidator(control: AbstractControl): ValidationErrors | null {
    return !/^[a-zA-Z\s]*$/.test(control.value)
      ? { lastNameLettersError: true }
      : null;
  }

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  onClickLogOut() {
    this.UserService.logOutUser().subscribe(
      (res) => {
        this.router.navigate(['/user']);
      },
      (error) => {
        this.router.navigate(['/user/profile']);
      }
    );
  }

  onSubmitProfileEditForm() {
    if (this.profilePage.valid) {
      if (this.password.value) {
        const user: User = {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          age: this.age.value,
          email: this.email.value,
          password: this.password.value,
        };
        this.UserService.editUser(user).subscribe(
          (res) => {
            console.log('asdasd');

            this.isModalOpen = true;
            this.msg = 'Your new info is updated';
          },
          (error) => {
            this.isModalOpen = true;
            this.msg =
              'The Email you chose is already taken, Please choose another one';
          }
        );
      } else {
        const user: User = {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          age: this.age.value,
          email: this.email.value,
        };
        this.UserService.editUser(user).subscribe(
          (res) => {
            console.log('asdasd');

            this.isModalOpen = true;
            this.msg = 'Your new info is updated';
          },
          (error) => {
            this.isModalOpen = true;
            this.msg =
              'The Email you chose is already taken, Please choose another one';
          }
        );
      }
    }
  }
}
