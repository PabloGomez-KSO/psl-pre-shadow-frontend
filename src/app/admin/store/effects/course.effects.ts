
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';
import * as courseActions from '../../store/actions';
import { CourseSelectors } from '../services/course.selectors';
import { of, Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course';

@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private courseAdministrationApi: CourseAdministrationApiService,
    private courseSelectors: CourseSelectors
  ) {
  }

  @Effect()
  getCoursesBatch$ = this.actions$.pipe(ofType(courseActions.GET_COURSES_BATCH))
    .pipe(
      withLatestFrom(this.courseSelectors.lastVisibleDocument$),
      switchMap(([action, lastVisibleDocument]) => {
        return this.getCoursesRequest(lastVisibleDocument);
      }));


  getCoursesRequest(lastVisibleDocument): Observable<any> {
    return this.courseAdministrationApi.getCourses(lastVisibleDocument).
      pipe(
        map((courses: Course[]) => {
          const getLastCourse = this.getLastVisibileCourse(courses);
          return new courseActions.GetCoursesBatchSuccess(courses, getLastCourse);
        }),
        catchError((error: Error) => of(new courseActions.GetCoursesBatchError(error))
        )
      );
  }

  getLastVisibileCourse(courses) {
    const coursesArraySize = courses.length;
    return courses[coursesArraySize - 1].doc;
  }
}
