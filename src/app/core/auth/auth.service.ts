import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from '../../shared/models/user';
import { HelperService } from '../../shared/services/helper.service';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private helperService: HelperService
  ) { }

  registerUser(user: User): Observable<any> {
    return from(this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password))
     .pipe(map(data => {
        this.updateUserData(data.user.uid, user);
        return data.user;
       })
      );
  }

  logIn(email: string, password: string): Observable<any> {
    return from(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logOut(): Observable<any> {
    return from(this.firebaseAuth.auth.signOut());
  }

  getAuth(): Observable<any> {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  updateUserData(userId: string, user: User): void {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${userId}`);
    delete user.password;
    const userToDB = this.helperService.setCandidateForDatabase(userId, user);
    userRef.set(userToDB, { merge: true });
  }
}
