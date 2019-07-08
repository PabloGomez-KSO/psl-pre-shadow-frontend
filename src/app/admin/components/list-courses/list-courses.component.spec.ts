import { ListCoursesComponent } from './list-courses.component';
import { empty, of, Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { Course } from 'src/app/shared/models/course';
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const expect = chai.expect;

describe('list-courses.component', () => {

  const createListCoursesComponent = (params: any) =>
  new ListCoursesComponent(
    params.adminHelper,
    params.router,
    params.courseDispatchers,
    params.courseSelectors,
  );

  const listCoursesMock = {
    router: {
      navigate: sinon.stub().returns(of(empty))
    },
    adminHelper: {
      getCourseCriteriaOptions: sinon.stub().returns(of({}))
    },
    courseDispatchers: {
      getCoursesBatch: sinon.stub(),
      resetCoursesState: sinon.stub().returns(of({}))
    },
    courseSelectors: {
      courses$: new Subject(),
      loading$: new Subject()
    }
  };

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

  let listCoursesComponent;
  beforeEach(() => {
    listCoursesComponent = createListCoursesComponent(listCoursesMock);
  });

  describe('ngOnInit', () => {

    it('should call external methods to initialize component', () => {

      const initObservables = sinon.stub(listCoursesComponent, 'initObservables');

      listCoursesComponent.ngOnInit();
      expect(listCoursesMock.adminHelper.getCourseCriteriaOptions).called;
      expect(listCoursesComponent.selectedCriteriaToSearch).eql('name');
      expect(initObservables).called;
      expect(listCoursesMock.courseDispatchers.getCoursesBatch).called;
    });

  });

  describe('initObservables', () => {

    it('course selector should retrieve the courses correctly', fakeAsync(() => {

      const testCourses: Course[] = [ course1, course2];
      listCoursesComponent.initObservables();
      listCoursesMock.courseSelectors.courses$.next(testCourses);
      tick();
      expect(listCoursesComponent.courses).eql(testCourses);
    }));

    it('loading selector should retrieve the correct value', fakeAsync(() => {

      const testLoading = false;
      listCoursesComponent.initObservables();
      listCoursesMock.courseSelectors.loading$.next(testLoading);
      tick();
      expect(listCoursesComponent.loading).eql(testLoading);
    }));
  });


  describe('scrollHandler', () => {
    it('should call method to dispatch action when the output of ScrollEvent is bottom', () => {
      const scrollEvent = 'bottom';
      const getBatchStub = sinon.stub(listCoursesComponent, 'getBatch');
      listCoursesComponent.scrollHandler(scrollEvent);
      expect(getBatchStub).called;
    });

    it('should not call method to dispatch action when the output of ScrollEvent is different to bottom', () => {
      const scrollEvent = 'top';
      const getBatchStub = sinon.stub(listCoursesComponent, 'getBatch');
      listCoursesComponent.scrollHandler(scrollEvent);
      expect(getBatchStub).to.have.not.been.called;
    });
  });

  describe('createCourse', () => {

    it('it should redirect to create course view', () => {
      listCoursesComponent.createCourse();
      expect(listCoursesComponent.router.navigate).calledWith(['/admin-dashboard/create_course']);
    });

  });

  describe('ngOnDestroy', () => {
    it('should set destroy subject on true in order to stop emitting observables', () => {
      const destroyStub = sinon.stub(listCoursesComponent.destroy$, 'next');
      listCoursesComponent.ngOnDestroy();
      expect(destroyStub).calledWith(true);
    });

    it('should dispatch action to reset state of courses', () => {
      listCoursesComponent.ngOnDestroy();
      expect(listCoursesMock.courseDispatchers.resetCoursesState).called;
    });
  });
});
