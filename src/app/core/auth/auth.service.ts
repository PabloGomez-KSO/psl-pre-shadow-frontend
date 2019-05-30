import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public firebaseAuth: AngularFireAuth
  ) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(
        userData => resolve(userData),
        error => reject(error)
      )
    })
  }

  logIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(
        userData => resolve(userData),
        error => reject(error)
      )
    })
  }

  logOut() {
    return this.firebaseAuth.auth.signOut();
  }

  getAuth() {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  get currentUserObservable(): any {
    return this.firebaseAuth.authState;
  }
}
