import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';
import { AlertService } from '../../../shared/notifications/alert.service';
import { AdminHelperService } from '../../services/admin-helper.service';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  action: string;
  defaultCourse: Course;

  constructor(
    private courseAdministrationApi: CourseAdministrationApiService,
    private alertService: AlertService,
    private adminHelper: AdminHelperService
    ) { }

  ngOnInit() {
    this.action = 'creation';
    this.defaultCourse = this.adminHelper.getCourseRebooted();

  }

  getFormOutput($courseEmmited: Course) {
    this.courseAdministrationApi.addCourse($courseEmmited).subscribe(() =>
      this.alertService.showMessage('Course created successfully', 'success', false)
    );
  }

}
