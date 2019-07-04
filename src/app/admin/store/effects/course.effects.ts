import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { CourseAdministrationApiService } from '../../services/course-administration-api.service';
import { EntityState } from '../reducers';
import * as courseActions from '../actions';
import { of } from 'rxjs/internal/observable/of';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class HeroesEffects {

  isFirstBatch = true;

  constructor(
    private actions$: Actions,
    public courseAdministrationApi: CourseAdministrationApiService,
    private store:
  ) {
  }

  @Effect()
  getCoursesBatch$ = this.actions$.ofType(courseActions.GET_COURSES_BATCH)
    .pipe(
      withLatestFrom(this.store$),
      switchMap(() => {
           return null;
      })
    );
}
