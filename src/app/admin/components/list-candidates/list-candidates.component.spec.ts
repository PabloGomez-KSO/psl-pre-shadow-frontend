import { ListCandidatesComponent } from './list-candidates.component';
import { empty, of, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
const sinonChai = require('sinon-chai');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(sinonChai);

describe('list-candidates.component', () => {

  const createListCandidatesComponent = (params: any) =>
    new ListCandidatesComponent(params.router,
      params.userApiService,
      params.adminHelper,
      params.alertService,
      params.adminApiService);

  const listCandidatesMock = {
    userApiService: {
      deleteUserById: sinon.stub()
    },
    router: {
      navigate: sinon.stub().returns(of(empty))
    },
    adminHelper: {
      getCriteriaOptions: sinon.stub(),
      getGeneralSearchValue: sinon.stub().returns(of({}))
    },
    alertService: {
      showAskNotification: sinon.stub().returns(of({}))
    },
    adminApiService: {
      getMoreUsers: sinon.stub(),
      getFirstBatchOfUsers: sinon.stub(),
      _users: new BehaviorSubject([])
    }
  };

  let listCandidatesComponent;

  beforeEach(() => {
    listCandidatesComponent = createListCandidatesComponent(listCandidatesMock);
  });

  describe('constructor', () => {
    it('list-candidate component should exist', () => {
      // tslint:disable-next-line:no-unused-expression
      expect(listCandidatesComponent).to.exist;
    });
  });

  describe('ngOnInit', () => {
    it('should call methods to initialize the component', () => {
      // listCandidatesComponent.ngOnInit();
      listCandidatesComponent.initObservables = sinon.stub();
      listCandidatesComponent.ngOnInit();
       // tslint:disable-next-line:no-unused-expression
      expect(listCandidatesComponent.initObservables).called;


    });

  });

});

