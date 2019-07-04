import { Action } from '@ngrx/store';
import { Course } from 'src/app/shared/models/course';

export const GET_COURSES_BATCH = '[Course] GET_COURSES_BATCH';
export const GET_COURSES_BATCH_SUCCESS = '[Course] GET_COURSES_BATCH_SUCCESS';
export const GET_COURSES_BATCH_ERROR = '[Course] GET_COURSES_BATCH_ERROR';

export class GetCoursesBatch implements Action {
  readonly type = GET_COURSES_BATCH;
}

export class GetCoursesBatchSuccess implements Action {
  readonly type = GET_COURSES_BATCH_SUCCESS;
  constructor(public readonly newCourses: Course[], public readonly document: any) {}
}

export class GetCoursesBatchError implements Action {
  readonly type = GET_COURSES_BATCH_ERROR;
  constructor(public readonly payload: any) {}
}

export type AllCourseActions =
| GetCoursesBatch
| GetCoursesBatchSuccess
| GetCoursesBatchError;
