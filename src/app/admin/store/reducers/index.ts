import {
  ActionReducerMap
} from '@ngrx/store';

import * as fromCourses from './course.reducer';
import * as fromListCandidate from './candidate-list.reducer';

export interface EntityState {
  courses: fromCourses.CourseState;
  searchState: fromListCandidate.SearchState;
}

export const reducers: ActionReducerMap<EntityState> = {
 courses: fromCourses.reducer,
 searchState: fromListCandidate.reducer
};
