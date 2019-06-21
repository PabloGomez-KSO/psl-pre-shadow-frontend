import * as sinon from 'sinon';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { UserApiService } from './user-api.service';
import { User } from '../models/user';
import { should, assert } from 'chai';
import * as Chai from 'chai';
let expect = Chai.expect;

describe('user-api.service', () => {

  let userApiService: UserApiService;

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
    //const callToUserDocumentId = sinon.stub(userApiService.getUserDocumentById('2d'));

    // expect(userApimock.angularFireStore.doc).toBe.call(onc)

    //expect(userApimock.angularFireStore.doc).toBe.

    expect(1 + 1).to.equals(2);



  });
});
