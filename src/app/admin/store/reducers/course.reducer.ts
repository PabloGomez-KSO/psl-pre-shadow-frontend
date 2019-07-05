import { Course } from '../../../shared/models/course';
import * as courseActions from '../actions';

export interface CourseState {
  courses: Course[];
  lastCourseDocument: any;
  loading: boolean;
  error: boolean;
}

export const initialState: CourseState = {
  courses: [],
  lastCourseDocument: null,
  loading: false,
  error: false
};

export function reducer(state = initialState, action: courseActions.AllCourseActions): CourseState {

  switch (action.type) {
    case courseActions.GET_COURSES_BATCH: {
      return {
        ...state,
        loading: true
      };
    }
    case courseActions.GET_COURSES_BATCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        lastCourseDocument: action.document,
        courses: [ ...state.courses, ...action.newCourses]
      };
    }

    case courseActions.GET_COURSES_BATCH_ERROR: {
      return {
         ...state,
         error: action.payload,
         loading: false
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
}
