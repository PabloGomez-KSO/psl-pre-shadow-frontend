import * as sinon from 'sinon';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { UserApiService } from './user-api.service';
import { User } from '../models/user';
import * as chai from 'chai';


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

  });
});
