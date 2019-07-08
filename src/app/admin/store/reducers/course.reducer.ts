import { Course } from '../../../shared/models/course';
import * as courseActions from '../actions';

export interface CourseState {
  courses: Course[];
  lastCourseDocument: any;
  loading: boolean;
  error: boolean;
  searchCriteria?: string;
  searchTerm?: string;
}

export const initialState: CourseState = {
  courses: [],
  lastCourseDocument: null,
  loading: false,
  error: false,
  searchTerm: ''
};

export function reducer(state = initialState, action: courseActions.AllCourseActions): CourseState {

  switch (action.type) {
    case courseActions.GET_COURSES_BATCH: {
      return {
        ...state,
        loading: true,
        searchCriteria: ''
      };
    }
    case courseActions.SET_COURSES_BATCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        lastCourseDocument: action.document,
        courses: [ ...state.courses, ...action.newCourses]
      };
    }

    case courseActions.SET_COURSES_BATCH_ERROR: {
      return {
         ...state,
         error: action.payload,
         loading: false
      };
    }

    case courseActions.SEARCH_COURSES_BY_CRITERIA: {
      return {
        ...state,
        loading: true,
        searchCriteria: action.criteria,
        searchTerm: action.searchTerm
      };
    }

    case courseActions.SEARCH_COURSES_BY_CRITERIA_SUCCESS: {
      return {
        ...state,
        loading: false,
        courses: [...action.courses]
      };
    }

    case courseActions.RESET_COURSES:
      return initialState;

    default: {
      return {
        ...state
      };
    }
  }
}
