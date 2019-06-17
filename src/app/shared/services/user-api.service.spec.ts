import { spy,  stub } from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { UserApiService } from './user-api.service';
import { User } from '../models/user';


describe('Shared - User-Api-Service', () => {

  let userApiService: UserApiService;

  beforeEach(() => {
    userApiService = new UserApiService(null);
  });

  it('Should return an AngularFireStoreDocument', () => {

    ///expect(userApiService.getUserDocumentById('2d')).toBe

  });


});
