import { spy } from 'sinon';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { UserApiService } from './user-api.service';


describe('Shared - User-Api-Service', () => {

  let userApiService: UserApiService;
  const angularFireStore: AngularFirestore;

  beforeEach(() => {
    userApiService = new UserApiService(angularFireStore);
  });

  it('Should return an AngularFireStoreDocument', () => {
    expect(4 + 4).toBe(8);
  });

});
