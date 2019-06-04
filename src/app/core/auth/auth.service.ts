import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "../../shared/models/user";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public firebaseAuth: AngularFireAuth,
    public angularFireStore: AngularFirestore
  ) { }

  registerUser(user: User, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .createUserWithEmailAndPassword(user.email, password)
        .then(data => {
          resolve(data.user), this.updateUserData(data.user.uid, user);
        })
        .catch(err => console.log(reject(err)));
    });
  }

  logIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), error => reject(error));
    });
  }

  logOut() {
    return this.firebaseAuth.auth.signOut();
  }

  getAuth() {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  updateUserData(userId: string, user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${userId}`
    );

    const userForDatabase: User = {
      ...user,
      id: userId
    };

    return userRef.set(userForDatabase, { merge: true });
  }
}
