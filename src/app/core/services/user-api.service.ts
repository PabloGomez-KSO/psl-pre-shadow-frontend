import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: "root"
})
export class UserApiService {
  private userDocument: AngularFirestoreDocument<User>;

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
}
