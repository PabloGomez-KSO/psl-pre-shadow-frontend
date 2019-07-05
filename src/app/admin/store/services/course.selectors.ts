import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState } from '../reducers';
import { CourseState } from '../reducers/course.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getCourseState = createSelector(
  getEntityState,
  (state: EntityState) => state.courses
);

const getLastVisibleDocument = createSelector(
   getCourseState,
  (state: CourseState) => state.lastCourseDocument
);

const getAllCourses = createSelector(
  getCourseState,
  (state: CourseState) => state.courses
);

@Injectable({
  providedIn: 'root'
})
export class CourseSelectors {
  constructor(private store: Store<EntityState>) {}

  courses$ = this.store.select(getAllCourses);
  courseState$ = this.store.select(getCourseState);
  lastVisibleDocument$ = this.store.select(getLastVisibleDocument);

}
