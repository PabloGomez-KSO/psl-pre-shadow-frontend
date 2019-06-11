import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "../../shared/models/user";
import { HelperService } from '../../shared/services/helper.service';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private helperService: HelperService
  ) { }

  registerUser(user: User, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .createUserWithEmailAndPassword(user.email, password)
        .then(data => {
          resolve(data.user), this.updateUserData(data.user.uid, user);
        })
        .catch(err => reject(err));
    });
  }

  logIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), error => reject(error));
    });
  }

  logOut(): Promise<any> {
    console.log(typeof this.firebaseAuth.auth.signOut() );
    return this.firebaseAuth.auth.signOut();
  }

  getAuth() {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  updateUserData(userId: string, user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${userId}`);
    const userToDB = this.helperService.setUserForDatabase(userId, user);
    return userRef.set(userToDB, { merge: true });
  }
}
