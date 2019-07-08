import * as actions from '../actions';
const sinon = require('sinon');
import { CourseDispatchersService } from './course.dispatchers.service';
const chai = require('chai');
const expect = chai.expect;

describe('CourseDispatchersService', () => {

  let serviceTest: CourseDispatchersService;

  const courseDispatcherServiceTest = (dependencies) => {
    return new CourseDispatchersService(dependencies.store)
  };

  const dependenciesMock = {
    store: {
      dispatch: sinon.stub()
    }
  };

  beforeEach(() => {
    serviceTest = courseDispatcherServiceTest(dependenciesMock);
  });

  describe('constructor', () => {
    it('Service should exist', () => {
      expect(serviceTest).exist;
    });
  });

  describe('getCoursesBatch', () => {

    it('Should call store.dispatch with GetCoursesBatch', () => {
      serviceTest.getCoursesBatch();
      expect(dependenciesMock.store.dispatch).calledWith(new actions.GetCoursesBatch());
    });

  });

  describe('resetCoursesState', () => {

    it('Should call store.dispatch with ResetCoursesState', () => {
      serviceTest.resetCoursesState();
      expect(dependenciesMock.store.dispatch).calledWith(new actions.ResetCoursesState());
    });

  });

  describe('searchCoursesByCriteria', () => {

    it('Should call store.dispatch with SearchCoursesByCriteria', () => {
      serviceTest.searchCoursesByCriteria('Angular', 'name');
      expect(dependenciesMock.store.dispatch).calledWith(new actions.SearchCoursesByCriteria('Angular', 'name'));
    });

  });


});


