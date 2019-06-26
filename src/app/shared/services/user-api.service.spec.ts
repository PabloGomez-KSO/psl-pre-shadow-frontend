import * as sinon from 'sinon';
import { UserApiService } from './user-api.service';
const chai = require('chai') , spies = require('chai-spies');
chai.use(spies);
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('user-api.service', () => {

  let userApiService: UserApiService;
  const should = chai.should();
  const expect = chai.expect;

  const createComponent = (params: any) => new UserApiService(params.angularFireStore);
  const userApimock = {
    angularFireStore: {
      doc: sinon.stub(),
      collection: sinon.stub()
    }
  };

  beforeEach(() => {
    userApiService = createComponent(userApimock);
  });

  describe('getUserDocumentById', () => {

    it('AngularFireStore doc should be called with the correct string', () => {
      const id = '2dd455';
      userApiService.getUserDocumentById('2dd455');
      expect(userApimock.angularFireStore.doc).calledWith(`users/${id}`);
    });

  });

  describe('getUserDocumentByEmail', () => {

    it('getUserDocumentById method', () => {
      const email = 'pvillegasg@psl.com.co';
      // userApiService.getUserDocumentById('2dd455');
     // expect(userApimock.angularFireStore.doc).to.have.been.calledWith(`users/${id}`);
    });

  });

  describe('getUserByEmail', () => {

    it('getUserDocumentById method', () => {
      const email = 'pvillegasg@psl.com.co';


    });

  });
});
