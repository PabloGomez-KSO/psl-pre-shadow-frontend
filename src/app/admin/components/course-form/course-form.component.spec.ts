const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const expect = chai.expect;
import { CourseFormComponent } from './course-form.component';
import { of } from 'rxjs/internal/observable/of';

describe('course-form.component', () => {

  const createCourseFormComponent  = (params: any) =>
   new CourseFormComponent (params.formBuilder,
                            params.adminHelper,
                            params.router);

  const softwareRoles: string[] = ['Frontend', 'Backend', 'QA', 'DevOps', 'Business Analyst'];

  const courseFormMock = {
    formBuilder: {
      group: sinon.stub()
    },
    adminHelper: {
      getSoftwareRoles: sinon.stub().returns(softwareRoles)
    },
    router: {
      navigate: sinon.stub().returns(of({}))
    }
  };

  let courseFormComponent;

  beforeEach(() => {
    courseFormComponent = createCourseFormComponent(courseFormMock);
  });
/*
  describe('ngOnInit', () => {

    it('should initialize form, software roles and call external functions', () => {

      const addTopic = sinon.stub(courseFormComponent, 'addTopic');
      const getCourseForm = sinon.stub(courseFormComponent, 'getCourseForm');

      courseFormComponent.ngOnInit();
      // tslint:disable-next-line:no-unused-expression
      expect(getCourseForm).called;
      // tslint:disable-next-line:no-unused-expression
      expect(addTopic).called;
      expect(courseFormComponent.softwareRoles).eql(softwareRoles);
    });
  });

  describe('getCourseForm', () => {

    it('should have default values when the action is a creation', () => {
      courseFormComponent.action = 'creation';
      courseFormComponent.getCourseForm();
      expect(courseFormMock.formBuilder.group).called;
    });

  });*/

  describe('goBack', () => {

    it('should navigate to list courses view', () => {
      courseFormComponent.goBack();
      expect(courseFormComponent.router.navigate).calledWith(['/admin-dashboard/list_courses']);
    });
  });

});
