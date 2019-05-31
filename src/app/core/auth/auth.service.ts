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
  ) {}

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData), this.updateUserData(userData.user);
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

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );

    const data: User = {
      id: user.uid,
      preference: "Frontend",
      name: 'Pablo Villegas',
      age: 24,
      username: 'pvillegasg',
      email: user.email,
      roles: {
        candidate: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  get currentUserObservable(): any {
    return this.firebaseAuth.authState;
  }
}
