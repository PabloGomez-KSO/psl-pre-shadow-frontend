import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private angularFireStore: AngularFirestore) { }

  getUserDocumentById(id: string): AngularFirestoreDocument<User> {
    console.log(id);
    return this.angularFireStore.doc<User>(`users/${id}`);
  }

  getUserCollectionByEmail(email: string) {
    return this.angularFireStore.collection('users', ref => ref.where('email', '==', email));
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


  getUserByEmail(email: string): Observable<any> {
    const userCollection = this.getUserCollectionByEmail(email);
    return userCollection.snapshotChanges();
  }

  deleteUserById(id: string): Observable<any> {
    const userDocument = this.getUserDocumentById(id);
    return from(userDocument.delete());
  }

  getCandidates(): Observable<User[]> {
    const userCollection = this.getUsersCollection();
    return userCollection
      .snapshotChanges()
      .pipe(map(changes => this.handleUserData(changes)));
  }

  updateUser(user: User): Observable<any> {
    const userDocument = this.getUserDocumentById(user.id);
    return from(userDocument.update(user));
  }

  handleUserData(changes) {
    return changes
      .map(action => this.getUserData(action))
      .filter((user: User) => this.verficateCandidate(user));
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
