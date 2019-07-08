import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';
import { AlertService } from 'src/app/shared/notifications/alert.service';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html'
})
export class EditCourseComponent implements OnInit {

  courseToEdit: Course;
  action: string;
  isCourseInitialized =  false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseAdministrationApi: CourseAdministrationApiService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.params.id;

    this.action = 'update';

    this.courseAdministrationApi.getCourseById(courseId)
                                .subscribe(course => {
                                  this.courseToEdit = course;
                                  this.isCourseInitialized = true;

                                });
  }

  getFormOutput($courseEmmited: Course) {
    this.courseAdministrationApi.updateCourse($courseEmmited, this.courseToEdit.id).subscribe(() =>
      this.alertService.showMessage('Course updated successfully', 'success', false)
    );
  }

}
