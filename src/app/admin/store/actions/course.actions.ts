import { Action } from '@ngrx/store';
import { Course } from '../../../shared/models/course';

export const GET_COURSES_BATCH = '[Course] GET_COURSES_BATCH';
export const SET_COURSES_BATCH_SUCCESS = '[Course] SET_COURSES_BATCH_SUCCESS';
export const SET_COURSES_BATCH_ERROR = '[Course] SET_COURSES_BATCH_ERROR';
export const SEARCH_COURSES_BY_CRITERIA = '[Course] SEARCH_COURSES_BY_CRITERIA';
export const SEARCH_COURSES_BY_CRITERIA_SUCCESS = '[Course] SEARCH_COURSES_BY_CRITERIA_SUCCESS';
export const RESET_COURSES = '[Course] RESET_COURSES_STATE';

export class GetCoursesBatch implements Action {
  readonly type = GET_COURSES_BATCH;
}
export class SetCoursesBatchSuccess implements Action {
  readonly type = SET_COURSES_BATCH_SUCCESS;
  constructor(public readonly newCourses: Course[], public readonly document: any) {}
}

export class SetCoursesBatchError implements Action {
  readonly type = SET_COURSES_BATCH_ERROR;
  constructor(public readonly payload: any) {}
}

export class SearchCoursesByCriteria implements Action {
  readonly type = SEARCH_COURSES_BY_CRITERIA;
  constructor(public searchTerm, public readonly criteria: any) {}
}

export class SearchCoursesByCriteriaSuccess implements Action {
  readonly type = SEARCH_COURSES_BY_CRITERIA_SUCCESS;
  constructor(public readonly courses: Course[]) {}
}
export class ResetCoursesState implements Action {
  readonly type = RESET_COURSES;
}

export type AllCourseActions =
| GetCoursesBatch
| ResetCoursesState
| SetCoursesBatchSuccess
| SetCoursesBatchError
| SearchCoursesByCriteria
| SearchCoursesByCriteriaSuccess
| SetCoursesBatchError
;
