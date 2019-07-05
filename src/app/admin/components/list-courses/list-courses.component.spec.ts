import { ListCoursesComponent } from './list-courses.component';
import { empty, of } from 'rxjs';
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
      getCoursesBatch: sinon.stub().returns(of({})),
      resetCoursesState: sinon.stub().returns(of({}))
    },
    courseSelectors: {
      courses$: sinon.stub().returns(of({})),
      loading$: sinon.stub().returns(of({}))
    }
  };
  let listCoursesComponent;
  beforeEach(() => {
    listCoursesComponent = createListCoursesComponent(listCoursesMock)
  });


});
