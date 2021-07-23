import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Screening } from 'src/models/screening.model';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-create-screening',
  templateUrl: './admin-create-screening.component.html',
  styleUrls: ['./admin-create-screening.component.css'],
})
export class AdminCreateScreeningComponent implements OnInit {
  createTeatherForm: FormGroup;
  name;
  times;
  teathers;

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
      times: ['', [Validators.required]],
      teathers: ['', [Validators.required]],
    });

    this.name = this.createTeatherForm.get('name');
    this.times = this.createTeatherForm.get('times');
    this.teathers = this.createTeatherForm.get('teathers');
  }

  ngOnInit(): void {}

  invalidNameMessage() {
    if (this.name.errors?.required) {
      return 'You must enter a screening name';
    }
  }

  invalidTimesMessage() {
    if (this.times.errors?.required) {
      return 'You must enter a screening times';
    }
  }

  invalidTeathersMessage() {
    if (this.teathers.errors?.required) {
      return 'You must enter teathers';
    }
  }

  onClickCloseModal() {
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.createTeatherForm.valid) {
      let timesArray: any[];
      timesArray = this.times.value.split(',', this.times.length);
      let teathersArray: any[];
      teathersArray = this.teathers.value.split(',', this.teathers.length);

      let screening: Screening = {
        name: this.name.value,
        times: timesArray,
        teathers: teathersArray,
      };

      this.AdminService.addScreening(screening).subscribe(
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
