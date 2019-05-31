import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: "root"
})
export class UserApiService {
  private userDocument: AngularFirestoreDocument<User>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(public angularFireStore: AngularFirestore) {}

  getUserById(id: string) {
    this.userDocument = this.angularFireStore.doc<User>(`users/${id}`);

    return this.userDocument.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as User;
          return data;
        }
      })
    );
  }

  getCandidates() {
    this.userCollection = this.angularFireStore.collection<User>("users");

    return this.userCollection.snapshotChanges().pipe(
      map(changes => {
        return changes
          .map(action => {
            const user = action.payload.doc.data() as User;
            return user;
          })
          .filter(user => {
            if (user.roles.candidate) return user;
          });
      })
    );
  }
}
