import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private angularFireStore: AngularFirestore) { }

  getUserDocumentById(id: string): AngularFirestoreDocument<User> {
    return this.angularFireStore.doc<User>(`users/${id}`);
  }

  getUserDocumentByEmail(email: string): AngularFirestoreDocument<User> {
    return this.angularFireStore.doc<User>(`users/${email}`);
  }

  getUsersCollection(): AngularFirestoreCollection<User> {
    return this.angularFireStore.collection<User>('users');
  }

  getUserById(id: string): Observable<User> {
    const userDocument = this.getUserDocumentById(id);
    return userDocument
      .snapshotChanges()
      .pipe(map((action) => this.verificateExistanceOfUser(action))
           );
  }

  getUserByEmail(email: string): Observable<User> {
    const userDocument = this.getUserDocumentById(email);
    return userDocument
      .snapshotChanges()
      .pipe(map(this.verificateExistanceOfUser));
  }

  deleteUserById(id: string): Promise<any> {
    const userDocument = this.getUserDocumentById(id);
    return userDocument.delete();
  }

  getCandidates(): Observable<User[]> {
    const userCollection = this.getUsersCollection();
    return userCollection
      .snapshotChanges()
      .pipe(map(changes => this.handleUserData(changes)));
  }

  updateUser(user: User): Promise<any> {
    const userDocument = this.getUserDocumentById(user.id);
    return userDocument.update(user);
  }

  handleUserData(changes) {
    return changes
      .map(action => this.getUserData(action))
      .filter((user: User) => this.verficateCandidate(user));
  }

  verificateExistanceOfUser(action): User {
    if (action.payload.exists) {
      console.log(action.payload);
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
