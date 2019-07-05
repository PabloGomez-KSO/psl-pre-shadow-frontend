import * as actions from '../actions';
import { Course } from '../../../shared/models/course';
const chai = require('chai');
const expect = chai.expect;

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

describe('admin-actions', () => {

  describe('GetHeroesBatch Action ', () => {

    it('should create GetHeroesBatch action', () => {
      const action = new actions.GetCoursesBatch();
      expect(action.type).equals(actions.GET_COURSES_BATCH);
    });
  });

  describe('GetCoursesBatchSuccess Action', () => {

    it('should create GetCoursesBatchSuccess Action successfully', () => {
      const testCourses: Course[] = [course1, course2];
      const lastDocument = null;
      const action = new actions.GetCoursesBatchSuccess(testCourses, lastDocument);
      expect(action.type).equals(actions.GET_COURSES_BATCH_SUCCESS);
      expect(action.document).equals(null);
      expect(action.newCourses).equals(testCourses);
    });

  });

  describe('ResetCoursesState Action ', () => {

    it('should create ResetCoursesState action', () => {
      const action = new actions.ResetCoursesState();
      expect(action.type).equals(actions.RESET_COURSES);
    });
  });

});