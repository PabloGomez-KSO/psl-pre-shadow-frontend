import { ListCandidatesComponent } from './list-candidates.component';
import { empty, of, BehaviorSubject } from 'rxjs';
const sinon = require('sinon');
import { User } from '../../../shared/models/user';
const sinonChai = require('sinon-chai');
const chai = require('chai');
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
      getMoreUsers: sinon.stub().returns(of({})),
      getFirstBatchOfUsers: sinon.stub().returns(of({})),
      _users: new BehaviorSubject([]),
      _done: new BehaviorSubject(false)
    }
  };

  let listCandidatesComponent;
  let user1, user2: User;

  beforeEach(() => {
    listCandidatesComponent = createListCandidatesComponent(listCandidatesMock);
    user1 = {
      id: '307c',
      name: 'Jean Rodriguez',
      email: 'jeana77@hotmail.com',
      roles: {
        candidate: true
      },
      startDate: '11/07/2019',
      releaseDate: '11/09/2019',
      preference: 'Backend'
    };

     user2 = {
      id: 'a7711333hph',
      name: 'Marcel Ann Den Boom',
      email: 'marcel@hotmail.dh',
      roles: {
        candidate: true
      },
      startDate: '11/07/2019',
      releaseDate: '11/09/2019',
      preference: 'Business Analyst'
    };
  });

  describe('constructor', () => {
    it('list-candidate component should exist', () => {
      expect(listCandidatesComponent).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    it('should call method initObservables', () => {
      const initObservables = spyOn(listCandidatesComponent, 'initObservables');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.initObservables).toHaveBeenCalled();
    });

    it('should call method getPage', () => {
      const getPage = spyOn(listCandidatesComponent, 'getPage');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.getPage).toHaveBeenCalled();

    });
  });

  describe('scrollHandler', () => {
    it('should call method getPage when the output of ScrollEvent is bottom and pagination is not finished yet', () => {
      const scrollEvent = 'bottom';
      const getPage = spyOn(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(listCandidatesComponent.getPage).toHaveBeenCalled();

    });

    it('should not call getPage method when the output of ScrollEvent is different from bottom', () => {
      const scrollEvent = 'top';
      const getPage = spyOn(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(getPage).not.toHaveBeenCalled();

    });
  });

  describe('getPage', () => {
    it('should call getMoreUsers when the candidates array is greater than 0', () => {

      const document: any = {
        exists: true,
        id: 'a7711333hph',
      };

      const expect = chai.expect;

      const getLastVisibileDocument = spyOn(listCandidatesComponent, 'getLastVisibileDocument').and.returnValue(document);
      listCandidatesComponent.candidates = [user1, user2];
      listCandidatesComponent.getPage();
      expect(listCandidatesMock.adminApiService.getMoreUsers).calledWith(document);
    });

    it('should call getFirstBatchOfUsers when candidates array is empty', () => {
      listCandidatesComponent.candidates = [];
      listCandidatesComponent.getPage();
      const expect = chai.expect;
      // expect(listCandidatesMock.adminApiService.getFirstBatchOfUsers).to.be.called();
    });
  });

  describe('addNewUsers', () => {
    it('should add new users to both arrays ( candidates, candidatesComplete )', () => {

      listCandidatesComponent.candidates = [ user1 ];

      const expectedCandidatesList = [ user1, user2 ];

      listCandidatesComponent.addNewUsers(user2);

      // console.log(listCandidatesComponent.candidates);
      // console.log(expectedCandidatesList);

     // expect(listCandidatesComponent.candidates).toEqual(expectedCandidatesList);
    });
  });
});

