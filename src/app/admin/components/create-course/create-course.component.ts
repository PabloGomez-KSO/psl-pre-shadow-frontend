import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';
import { AlertService } from '../../../shared/notifications/alert.service';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  action: string;

  constructor(private courseAdministrationApi: CourseAdministrationApiService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.action = 'creation';
  }

  getFormOutput($courseEmmited: Course) {
    this.courseAdministrationApi.addCourse($courseEmmited).subscribe((data) => {
      console.log(data);
      this.alertService.showMessage('Course created successfully', 'success', false);
     }
    );
  }

}
