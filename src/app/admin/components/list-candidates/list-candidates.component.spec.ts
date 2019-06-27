import { ListCandidatesComponent } from './list-candidates.component';
import { empty, of, BehaviorSubject } from 'rxjs';
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
      getCriteriaOptions: sinon.stub().returns(of({})),
      getGeneralSearchValue: sinon.stub().returns(of({}))
    },
    alertService: {
      showAskNotification: sinon.stub().returns(of({}))
    },
    adminApiService: {
      getMoreUsers: sinon.stub(),
      getFirstBatchOfUsers: sinon.stub(),
      _users: new BehaviorSubject([]),
      _done: new BehaviorSubject(false)
    }
  };

  let listCandidatesComponent;

  beforeEach(() => {
    listCandidatesComponent = createListCandidatesComponent(listCandidatesMock);
  });

  describe('constructor', () => {
    it('list-candidate component should exist', () => {
      expect(listCandidatesComponent).to.exist;
    });
  });

  describe('ngOnInit', () => {
    it('should call method initObservables', () => {
      const initObservables = chai.spy.on(listCandidatesComponent, 'initObservables');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.initObservables).to.be.called();
    });

    it('should call method getPage', () => {
      const getPage = chai.spy.on(listCandidatesComponent, 'getPage');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.getPage).to.be.called();
    });
  });


  describe('scrollHandler', () => {
    it('should call method getPage when the output of ScrollEvent is bottom and pagination is not finished yet', () => {

      const scrollEvent = 'bottom';
      const getPage = chai.spy.on(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(listCandidatesComponent.getPage).to.be.called();

    });

    it('should not call getPage method when the output of ScrollEvent is different from bottom', () => {

      const scrollEvent = 'top';
      const getPage = chai.spy.on(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(listCandidatesComponent.getPage).to.not.be.called();

    });
  });

});

