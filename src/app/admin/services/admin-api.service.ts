import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
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

  getFirstBatchOfUsers(): Observable<any> {
    this.isFirstBatch = true;
    const firstBatch = this.angularFirestore.collection(
      'users',
      ref => ref.orderBy('name').limit(this.batchSize)
    );

    return this.mapAndUpdate(firstBatch);
  }

  getMoreUsers(lastVisibleDocument: any): Observable<any> {
    this.isFirstBatch = false;
    const more = this.angularFirestore.collection('users', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(lastVisibleDocument);
    });
    return this.mapAndUpdate(more);
  }

  mapAndUpdate(userCollection: AngularFirestoreCollection<any>): Observable<any> {
    if (this._done.value) {
      return null;
    }

    this._loading.next(true);

    return userCollection
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
        }));
  }

  reset() {
    this._users.next([]);
    this._done.next(false);
    this._loading.next(true);
  }
}
