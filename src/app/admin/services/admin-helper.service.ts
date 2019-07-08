import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Course } from 'src/app/shared/models/course';
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

  private candidateCriteriaOptions: string[] = [
    'name',
    'email',
    'age',
    'startDate',
    'releaseDate',
    'preference'
  ];

  private courseCriteraOptions: string[] = [ 'name', 'number of candidates', 'category', 'duration', 'topics'];

  private softwareRoles: string[] = ['Frontend', 'Backend', 'QA', 'DevOps', 'Business Analyst'];

  private generalSearchObservable = new Subject();

  getGeneralSearchValue() {
    return this.generalSearchObservable;
  }

  getCourseCriteriaOptions() {
    return this.courseCriteraOptions;
  }

  updateGeneralSearchValue(value: string) {
    this.generalSearchObservable.next(value);
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

  getCourseRebooted(): Course {
    const course: Course = {
      name: '',
      numberOfCandidates: null,
      duration: '',
      category: '',
      topics: []
    };
    return course;
  }

  getCandidateCriteriaOptions(): string[] {
    return this.candidateCriteriaOptions;
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
