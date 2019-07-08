import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../reducers';
import * as courseActions from '../actions';

@Injectable({
  providedIn: 'root'
})
export class CourseDispatchersService {

  constructor(private store: Store<EntityState>) { }

  getCoursesBatch() {
    this.store.dispatch(new courseActions.GetCoursesBatch());
  }

  resetCoursesState() {
    this.store.dispatch(new courseActions.ResetCoursesState());
  }

  searchCoursesByCriteria(term: string, criteria: string) {
    this.store.dispatch(new courseActions.SearchCoursesByCriteria(term, criteria));
  }

}
