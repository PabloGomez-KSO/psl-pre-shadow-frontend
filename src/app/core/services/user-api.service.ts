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
  private userDocument: AngularFirestoreDocument<User>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(public angularFireStore: AngularFirestore) {}

  getUserById(id: string): Observable<User> {
    this.userDocument = this.getUserDocumentById(id);
    return this.userDocument
      .snapshotChanges()
      .pipe(map(action => this.verificateExistanceOfUser(action)));
  }

  getCandidates() {
    this.userCollection = this.getUsersCollection();
    return this.userCollection
      .snapshotChanges()
      .pipe(map(changes => this.handleUserData(changes)));
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
