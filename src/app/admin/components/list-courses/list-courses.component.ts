import { Component, OnInit } from '@angular/core';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Course } from '../../../shared/models/course';
import { Router } from '@angular/router';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  criteriaOptions: string[];
  selectedCriteriaToSearch: string;
  termToSearch: string;
  courses: Course[];

  constructor(private adminHelper: AdminHelperService,
              private router: Router,
              private courseAdministrationApi: CourseAdministrationApiService
          ) { }

  ngOnInit() {
    this.criteriaOptions = this.adminHelper.getCourseCriteriaOptions();
    this.selectedCriteriaToSearch = 'name';
    this.getCourses();
  }

  searchByCriteria(term: string) {
    console.log(term);
  }

  createCourse() {
    this.router.navigate(['/admin-dashboard/create_course']);
  }

  getCourses() {
    this.courseAdministrationApi.getCourses().subscribe((courses: Course[]) => this.courses = courses);
  }


}
