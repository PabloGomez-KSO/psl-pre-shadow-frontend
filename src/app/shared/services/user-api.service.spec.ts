import * as sinon from 'sinon';
import { UserApiService } from './user-api.service';
import * as spies from 'chai-spies';
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
      expect(userApimock.angularFireStore.doc).to.have.been.called.with()

    });

  });
});
