import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.nodel';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  email;
  password;

  isAdmin = false;
  signInErrorMessage;
  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private AdminService: AdminService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.email = this.signInForm.get('email');
    this.password = this.signInForm.get('password');
  }

  ngOnInit(): void {}

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
  }

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  onAdminButtonClick() {
    this.isAdmin = !this.isAdmin;
  }

  onSubmitSignInForm() {
    if (this.signInForm.valid) {
      if (this.isAdmin) {
        this.AdminService.adminLogIn(
          this.email.value,
          this.password.value
        ).subscribe((res) => {
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res));
          this.AdminService.isAdminLogged.next(true);
          this.router.navigate(['/admin-dashboard'], {
            state: { isAdmin: true },
          });
        });
      } else {
        this.UserService.loginUser(
          this.email.value,
          this.password.value
        ).subscribe(
          (res) => {
            localStorage.setItem('token', JSON.stringify(res));
            this.router.navigate(['/user/profile']);
          },
          (error) => {
            this.signInErrorMessage = error.error;
            this.isModalOpen = true;
          }
        );
      }
    }
  }
}
