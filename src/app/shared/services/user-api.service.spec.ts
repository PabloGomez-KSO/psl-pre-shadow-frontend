import { spy,  stub, sinon } from 'sinon';
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
  /*let mock = {
    AngularFirestore: sinon.stub()
  }*/

  /*beforeEach(() => {
    userApiService = new UserApiService(mock);
  });
*/
  it('Should return an AngularFireStoreDocument', () => {


    var stub = sinon.stub();

     stub.returns(54)

     console.log(stub);

    ///expect(userApiService.getUserDocumentById('2d')).toBe

  });





});
