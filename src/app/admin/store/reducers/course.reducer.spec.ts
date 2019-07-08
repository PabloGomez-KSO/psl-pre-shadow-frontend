import * as actions from '../actions';
import { Course } from '../../../shared/models/course';
import { CourseState, reducer } from './course.reducer';
const chai = require('chai');
const expect = chai.expect;

describe('courseReducer', () => {

  const course1: Course = {
    name: 'NgRx Background',
    numberOfCandidates: 5,
    duration: '2 week',
    topics: [
      { name: 'Gentile Introduction to NgRx', link: 'www.test1.com' },
      { name: 'Store, Reducer and Actions', link: 'www.test2.com' },
      { name: 'Selectors, Effects and Entities', link: 'www.test2.com' }
    ],
    category: 'Frontend'
  };

  const course2: Course = {
    name: 'CSS Fundamentals',
    numberOfCandidates: 10,
    duration: '5 week',
    topics: [
      { name: 'Selectors', link: 'www.test1.com' },
      { name: 'Combinators', link: 'www.test2.com' },
      { name: 'Position of elements', link: 'www.udemy.com' }
    ],
    category: 'Frontend'
  };

  const course3: Course = {
    name: 'Angular Forms',
    numberOfCandidates: 5,
    duration: '4 week',
    topics: [
      { name: 'Approach with template', link: 'www.test1.com' },
      { name: 'Approach with reactive forms', link: 'www.test2.com' }
    ],
    category: 'Frontend'
  };

  const course4: Course = {
    name: 'React',
    numberOfCandidates: 5,
    duration: '7 week',
    topics: [
      { name: 'Introduction', link: 'www.test1.com' },
      { name: 'Components and props', link: 'www.test2.com' },
      { name: 'Rendering Elements', link: 'www.test3.com' },
      { name: 'Lifecycle', link: 'www.test4.com' }
    ],
    category: 'Frontend'
  };

   const initialState: CourseState = {
      courses: [],
      lastCourseDocument: null,
      loading: false,
      error: false,
      searchTerm: ''
    };


  it('should return correct information with GET_COURSES_BATCH Action', () => {

    const testAction = new actions.GetCoursesBatch();

    const result = reducer(initialState, testAction);

    const expectedResult: CourseState = {
      courses: [],
      lastCourseDocument: null,
      loading: true,
      error: false,
      searchCriteria: '',
      searchTerm: ''
    };
    expect(result).to.eql(expectedResult);

  });

  it('should return correct information with GET_COURSES_BATCH_SUCCESS Action and RESET COURSES', () => {

    const document: any = {
      exists: true,
      id: 'a7711333hph',
    };

    const testState: CourseState = {
      courses: [course1, course2],
      lastCourseDocument: document,
      loading: true,
      error: false
    };

    const newLastDocumentVisible: any = {
      exists: true,
      id: 'a7711333hph',
    };

    const newCourses: Course[] = [ course3, course4];

    const testAction = new actions.SetCoursesBatchSuccess(newCourses, newLastDocumentVisible);

    const result = reducer(testState, testAction);

    const expectedResult: CourseState = {
      courses: [course1, course2, course3, course4],
      lastCourseDocument: newLastDocumentVisible,
      loading: false,
      error: false
    };
    expect(result).to.eql(expectedResult);

  });

  it('should return correct information with RESET_COURSES action', () => {
    const testState: CourseState = {
      courses: [course1, course2, course3, course4],
      lastCourseDocument: document,
      loading: true,
      error: false,
      searchTerm: 'sdaaoidsasaijpaskdasdaso'
    };

    const testResetAction = new actions.ResetCoursesState();

    const result = reducer(testState, testResetAction);

    expect(result).to.eql(initialState);

  });

  it('should update correct information with SEARCH_COURSES_BY_CRITERIA ACTION', () => {

    const testState: CourseState = {
      courses: [course1, course2],
      lastCourseDocument: document,
      loading: true,
      error: false,
      searchTerm: ''
    };

    const testAction = new actions.SearchCoursesByCriteria('Angular', 'name');

    const result = reducer(testState, testAction);

    const expectedResult: CourseState = {
      courses: [course1, course2],
      lastCourseDocument: document,
      loading: true,
      error: false,
      searchTerm: 'Angular',
      searchCriteria: 'name'
    };

    expect(result).to.eql(expectedResult);
  });

  it('should update correct information with SEARCH_COURSES_BY_CRITERIA_SUCCESS ACTION', () => {

    const testState: CourseState = {
      courses: [course1, course2, course3, course4],
      lastCourseDocument: document,
      loading: true,
      error: false,
      searchTerm: 'Angular',
      searchCriteria: 'name'
    };

    const resultCourses: Course[] = [course3];

    const testAction = new actions.SearchCoursesByCriteriaSuccess(resultCourses);

    const result = reducer(testState, testAction);

    const expectedResult: CourseState = {
      courses: [course3],
      lastCourseDocument: document,
      loading: false,
      error: false,
      searchTerm: 'Angular',
      searchCriteria: 'name'
    };

    expect(result).to.eql(expectedResult);
  });

});
