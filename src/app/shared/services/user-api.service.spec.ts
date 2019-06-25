import * as sinon from 'sinon';
import { UserApiService } from './user-api.service';
const chai = require('chai') , spies = require('chai-spies');
chai.use(spies);
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

    it('should verify that getUserDocumentById was called', () => {
      userApiService.getUserDocumentById('2dasbb55');
      console.log(userApiService);
       expect(userApiService).to.have.been.called();
    });

  });
});
