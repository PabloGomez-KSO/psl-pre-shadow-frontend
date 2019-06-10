import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(public angularFireStore: AngularFirestore) {}

  getUserById(id: string): Observable<User> {
    const userDocument = this.getUserDocumentById(id);
    return userDocument
      .snapshotChanges()
      .pipe(map(this.verificateExistanceOfUser));
  }

  getCandidates() {
    const userCollection  = this.getUsersCollection();
    return userCollection
      .snapshotChanges()
      .pipe(map(changes => this.handleUserData(changes)));
  }

  updateUser(user: User) {
    const userDocument = this.getUserDocumentById(user.id);
    return userDocument.update(user);
  }

  handleUserData(changes) {
    return changes
      .map(action => this.getUserData(action))
      .filter((user: User) => this.verficateCandidate(user));
  }

  getUserDocumentById(id: string) {
    return this.angularFireStore.doc<User>(`users/${id}`);
  }

  getUsersCollection() {
    return this.angularFireStore.collection<User>('users');
  }

  verificateExistanceOfUser(action): User {
    if (action.payload.exists) {
      return action.payload.data() as User;
    }
  }

  getUserData(action): User {
    return action.payload.doc.data() as User;
  }

  verficateCandidate(user: User): User {
    if (user.roles.candidate) {
      return user;
    }
  }
}
