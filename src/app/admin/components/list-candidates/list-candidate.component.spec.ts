import { ListCandidatesComponent } from './list-candidates.component';
import { empty, of, BehaviorSubject, Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
const sinon = require('sinon');
import { User } from '../../../shared/models/user';
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const expect = chai.expect;

describe('list-candidates.component', () => {

  const createListCandidatesComponent = (params: any) =>
    new ListCandidatesComponent(params.router,
      params.userApiService,
      params.adminHelper,
      params.alertService,
      params.adminApiService, params.store);

  const listCandidatesMock = {
    userApiService: {
      deleteUserById: sinon.stub()
    },
    router: {
      navigate: sinon.stub().returns(of(empty))
    },
    adminHelper: {
      getCandidateCriteriaOptions: sinon.stub().returns(of({})),
      getGeneralSearchValue: sinon.stub().returns(new Subject())
    },
    alertService: {
      showAskNotification: sinon.stub().returns(of({}))
    },
    adminApiService: {
      getMoreUsers: sinon.stub().returns(of({})),
      getFirstBatchOfUsers: sinon.stub().returns(of({})),
      _users: new BehaviorSubject([]),
      _done: new BehaviorSubject(false),
      reset: sinon.stub().returns(of({}))
    }
  };

  let listCandidatesComponent;
  let user1, user2: User;

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

  beforeEach(() => {
    listCandidatesComponent = createListCandidatesComponent(listCandidatesMock);
    sinon.stub(listCandidatesComponent, 'getSearchFromStore');
  });

  describe('constructor', () => {
    it('list-candidate component should exist', () => {
      expect(listCandidatesComponent).exist;
    });
  });

  describe('ngOnInit', () => {
    it('should call method initObservables ', () => {
      const initObservables = sinon.stub(listCandidatesComponent, 'initObservables');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.initObservables).called;
    });

    it('should call method getPage', () => {
      const getPage = sinon.stub(listCandidatesComponent, 'getPage');
      listCandidatesComponent.ngOnInit();
      expect(listCandidatesComponent.getPage).called;

    });
  });


  describe('scrollHandler', () => {
    it('should call method getPage when the output of ScrollEvent is bottom and pagination is not finished yet', () => {
      const scrollEvent = 'bottom';
      const getPage = sinon.stub(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(listCandidatesComponent.getPage).called;

    });

    it('should not call getPage method when the output of ScrollEvent is different from bottom', () => {
      const scrollEvent = 'top';
      const getPage = sinon.stub(listCandidatesComponent, 'getPage');
      listCandidatesComponent.scrollHandler(scrollEvent);
      expect(getPage).to.not.have.been.called;

    });
  });

  describe('getPage', () => {
    it('should call getMoreUsers when the candidates array is greater than 0', () => {

      const document: any = {
        exists: true,
        id: 'a7711333hph',
      };

      const getLastVisibileDocument = sinon.stub(listCandidatesComponent, 'getLastVisibileDocument').returns(document);
      listCandidatesComponent.candidates = [user1, user2];
      listCandidatesComponent.getPage();
      expect(listCandidatesMock.adminApiService.getMoreUsers).calledWith(document);
    });

    it('should call getFirstBatchOfUsers when candidates array is empty', () => {
      listCandidatesComponent.candidates = [];
      listCandidatesComponent.getPage();
      expect(listCandidatesMock.adminApiService.getFirstBatchOfUsers).called;
    });
  });

  describe('addNewUsers', () => {
    it('should add new users to both arrays ( candidates, candidatesComplete )', () => {
     
      listCandidatesComponent.candidates = [ user1 ];
      const expectedCandidatesList = [ user1, user2 ];
      listCandidatesComponent.addNewUsers(user2);
      //expect(listCandidatesComponent.candidates).equal(expectedCandidatesList);
    });
  });

  describe('sortWhenClicked', () => {
    it('call sortByCriteria when selected criteria is different from option that user clicked', () => {
       listCandidatesComponent.selectedCriteriaToSort = 'name';
       const option = 'age';
       const sortByCriteria = sinon.stub(listCandidatesComponent, 'sortByCriteria');

       listCandidatesComponent.sortWhenClicked(option);

       expect(listCandidatesComponent.selectedCriteriaToSort).equal(option);
       expect(listCandidatesComponent.isSortedAscendent).equal(true);
       expect(sortByCriteria).called;
    });

    it('call sortByCriteria when selected criteria is equal to option that user clicked', () => {
      listCandidatesComponent.selectedCriteriaToSort = 'age';
      const option = 'age';
      listCandidatesComponent.isSortedAscendent = true;
      const sortByCriteria = sinon.stub(listCandidatesComponent, 'sortByCriteria');
      listCandidatesComponent.sortWhenClicked(option);

      expect(listCandidatesComponent.isSortedAscendent).equal(false);
      expect(sortByCriteria).called;
   });
  });

  describe('editCandidate', () => {

    it('should call update_candidate view for update', () => {
      const idUserToEdit = user2.id;
      listCandidatesComponent.editCandidate(idUserToEdit);
      expect(listCandidatesMock.router.navigate).calledWith(['/admin-dashboard/update_candidate', idUserToEdit]);
    });
  });

  describe('createCandidate', () => {

    it('it should call reset method from admin api service and redirect to create candidate', () => {
      listCandidatesComponent.createCandidate();
      expect(listCandidatesMock.adminApiService.reset).called;
      expect(listCandidatesMock.router.navigate).calledWith(['/admin-dashboard/create_candidate']);
    });

  });

  describe('initObservables', () => {
    it('it should call generalSearch method', fakeAsync(() => {
       const generalSearch = sinon.stub(listCandidatesComponent, 'generalSearch');
       listCandidatesComponent.initObservables();
       const searchTest = 'Test Search';
       listCandidatesMock.adminHelper.getGeneralSearchValue().next(searchTest);
       tick();
       expect(generalSearch).calledWith(searchTest);
    }));
  });

});
