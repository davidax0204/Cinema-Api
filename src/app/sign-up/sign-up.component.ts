import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.nodel';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  firstName;
  lastName;
  age;
  email;
  password;
  passwordRepeated;

  submitError;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, this.firstNameValidator]],
        lastName: ['', [Validators.required, this.lastNameValidator]],
        age: ['', [Validators.required, Validators.min(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        passwordRepeated: ['', Validators.required],
      },
      {
        validators: this.passwordRepeatedValidator,
      }
    );

    this.firstName = this.signUpForm.get('firstName');
    this.lastName = this.signUpForm.get('lastName');
    this.age = this.signUpForm.get('age');
    this.email = this.signUpForm.get('email');
    this.password = this.signUpForm.get('password');
    this.passwordRepeated = this.signUpForm.get('passwordRepeated');
  }

  ngOnInit(): void {}

  invalidFirstNameMessage() {
    if (this.firstName.errors?.required) {
      return 'You must enter a first name';
    }
    if (this.firstName.errors?.firstNameLettersError) {
      return 'You must enter letters only';
    }
  }

  invalidLastNameMessage() {
    if (this.lastName.errors?.required) {
      return 'You must enter a last name';
    }
    if (this.lastName.errors?.lastNameLettersError) {
      return 'You must enter letters only';
    }
  }

  invalidAgeMessage() {
    if (this.age.errors?.required) {
      return 'You must enter your age';
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
    if (this.password.errors?.required) {
      return 'You must enter a password';
    }
    if (this.password.errors?.passwordinvalid) {
      return 'A password must contain digits and no spaces';
    }
  }

  invalidPsswordRepeatedMessage() {
    if (this.passwordRepeated.errors?.required) {
      return 'You must repeat on the password';
    }

    if (this.signUpForm.errors?.passwordnotrepeated) {
      return 'Two passwords must ne identical.';
    }
  }

  passwordRepeatedValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const passwordRepeated = control.get('passwordRepeated').value;
    return password !== passwordRepeated ? { passwordnotrepeated: true } : null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
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

  onSubmitSignUpForm() {
    if (this.signUpForm.valid) {
      const user: User = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        age: this.age.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.UserService.addUser(user).subscribe(
        (res) => {
          this.router.navigate(['']);
        },
        (error) => {
          this.submitError = error.error;
          this.isModalOpen = true;
        }
      );
    }
  }
}
