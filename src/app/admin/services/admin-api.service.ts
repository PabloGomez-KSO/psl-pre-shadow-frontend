import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  _done = new BehaviorSubject(false);
  _loading = new BehaviorSubject(false);
  _users = new BehaviorSubject([]);

  userCollectionSubsciption: Subscription;
  batchSize = 14;
  isFirstBatch = true;

  constructor(public angularFirestore: AngularFirestore) { }

  getFirstBatchOfUsers(): void {
    this.isFirstBatch = true;
    const firstBatch = this.angularFirestore.collection(
      'users',
      ref => ref.orderBy('name').limit(this.batchSize)
    );

    // tslint:disable-next-line:max-line-length
    firstBatch.snapshotChanges().pipe(map(changes =>  changes.map((action: any) => console.log(this.isFirstBatch + ' ' + action.payload.doc.data().name)))).subscribe();

    this.mapAndUpdate(firstBatch);
  }

  getMoreUsers(lastVisibleDocument: any): void {
    this.isFirstBatch = false;
    const more = this.angularFirestore.collection('users', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(lastVisibleDocument);
    });
    this.mapAndUpdate(more);
  }

  mapAndUpdate(userCollection: AngularFirestoreCollection<any>): void {
    if (this._done.value) {
      return null;
    }

    this._loading.next(true);

    // tslint:disable-next-line:max-line-length
    userCollection.snapshotChanges().pipe(map(changes =>  changes.map((action: any) => console.log(this.isFirstBatch + ' en el 2 ' + action.payload.doc.data().name)))).subscribe();

    this.userCollectionSubsciption = userCollection
      .snapshotChanges()
      .pipe(
        tap(arr => {
          const values = arr.map(action => {
            const data = action.payload.doc.data();
            const doc = action.payload.doc;
            return { ...data, doc };
          });

          this._users.next(values);
          this._loading.next(false);

          if (!values.length) {
            this._done.next(true);
          }
        }))
      .subscribe();
  }

  reset() {
    this._users.next([]);
    this._done.next(false);
    this._loading.next(true);
  }
}
