import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../validators/passwordValidator';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {

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

  getCandidateCreateFormValidator(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      username: new FormControl('', [Validators.required, Validators.min(3)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', Validators.required),
      start_date: new FormControl('', [Validators.required]),
      release_date: new FormControl('', [Validators.required]),
      preference: new FormControl('', [Validators.required])
    },
      {
        validators: PasswordValidation.MatchPassword
      }
    );
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

  getCriteraOptions(): string[] {
    return this.criteriaOptions;
  }

  getSoftwareRoles(): string[] {
    return this.softwareRoles;
  }

  convertStringIntoNgBootstrapDate(s: string): any {
    const date = moment(s, 'YYYY/MM/DD');
    return { day: date.format('D'), month: date.format('M'), year: date.format('YYYY')};
  }
}
