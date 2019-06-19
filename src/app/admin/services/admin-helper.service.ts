import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../validators/passwordValidator';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { AuthService } from '../../core/auth/auth.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {


  constructor(private authService: AuthService) {
  }

  private criteriaOptions: string[] = [
    'name',
    'email',
    'age',
    'startDate',
    'releaseDate',
    'preference'
  ];

  private softwareRoles: string[] = ['Frontend', 'Backend', 'QA', 'DevOps', 'Business Analyst'];

  private generalSearchObservable = new Subject();

  getGeneralSearchValue() {
    return this.generalSearchObservable;
  }

  updateGeneralSearchValue(value: string) {
    this.generalSearchObservable.next(value);
  }

  getUpdateFormValidator(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      start_date: new FormControl('', [Validators.required]),
      release_date: new FormControl('', [Validators.required]),
      preference: new FormControl('', [Validators.required])
    });
  }

  getUserRebooted(): User {
    const user: User = {
      id: '',
      name: '',
      username: '',
      email: '',
      age: null,
      startDate: null,
      releaseDate: null,
      preference: '',
      roles: {
        candidate: true
      }
    };
    return user;
  }

  setUserWithFormValues(candidateFormValue): User {
    const user: User = {
      name: candidateFormValue.name,
      username: candidateFormValue.username,
      email: candidateFormValue.email,
      age: candidateFormValue.age,
      startDate: candidateFormValue.start_date,
      releaseDate: candidateFormValue.release_date,
      preference: candidateFormValue.preference,
      password: candidateFormValue.password,
      roles: {
        candidate: true
      }
    };
    return user;
  }

  getCriteraOptions(): string[] {
    return this.criteriaOptions;
  }

  getSoftwareRoles(): string[] {
    return this.softwareRoles;
  }

  convertStringIntoNgBootstrapDate(stringDate: string): NgbDateStruct {

    const date = moment(stringDate);
    const ngbDateStruct = {
      day: Number(date.format('D')),
      month: Number(date.format('M')),
      year: Number(date.format('Y'))
    };
    return ngbDateStruct;

  }
}
