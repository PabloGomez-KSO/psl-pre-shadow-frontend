const sinon = require('sinon');
import { Course } from '../../../shared/models/course';
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const expect = chai.expect;
import { CreateCourseComponent } from './create-course.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { Subject, of } from 'rxjs';

describe('create-course.component', () => {

  const createCourseComponent = (params: any) => new CreateCourseComponent(
    params.courseAdministrationApi, params.alertService, params.adminHelper);

  const courseTest: Course = {
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

  const defaultCourse: Course = {
    name: '',
    numberOfCandidates: null,
    duration: '',
    category: '',
    topics: []
  };


  const createCourseMock = {
    courseAdministrationApi: {
      addCourse: sinon.stub().returns(new Subject())
    },
    alertService: {
      showMessage: sinon.stub()
    },
    adminHelper: {
      getCourseRebooted: sinon.stub().returns(defaultCourse)
    }
  };

  let courseComponent;

  beforeEach(() => {
    courseComponent = createCourseComponent(createCourseMock);
  });

  describe('ngOnInit', () => {

    it('should set action and initialize default course', () => {
       courseComponent.ngOnInit();
       expect(courseComponent.action).equal('creation');
       expect(courseComponent.defaultCourse).to.eql(defaultCourse);
    });

  });

  describe('getFormOutput', () => {

    it('should call addCourse method with the course', () => {
     courseComponent.getFormOutput(courseTest);
     expect(createCourseMock.courseAdministrationApi.addCourse).calledWith(courseTest);

    });

    it('it should call show message method', fakeAsync(() => {
      courseComponent.getFormOutput(courseTest);
      createCourseMock.courseAdministrationApi.addCourse(courseTest).next({});
      tick();
      expect(createCourseMock.alertService.showMessage).calledWith('Course created successfully', 'success', false);
    }));

  });

});
