import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { tap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  _done = new BehaviorSubject(false);
  _loading = new BehaviorSubject(false);
  _users = new BehaviorSubject([]);

  userCollectionSubsciption: Subscription;
  batchSize = 14;

  constructor(public angularFirestore: AngularFirestore) { }

  getFirstBatchOfUsers(): Observable<any> {
    const firstBatch = this.angularFirestore.collection(
      'users',
      ref => ref.orderBy('name').limit(this.batchSize)
    );

    return this.mapAndUpdate(firstBatch);
  }

  getMoreUsers(lastVisibleDocument: any): Observable<any> {
    const more = this.angularFirestore.collection('users', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(lastVisibleDocument);
    });
    return this.mapAndUpdate(more);
  }

  mapAndUpdate(userCollection: AngularFirestoreCollection<any>): Observable<any> {

    return userCollection
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(arr =>
          arr.map(action => {
            const data = action.payload.doc.data();
            const doc = action.payload.doc;
            return { ...data, doc };
          })));

  }

  reset() {
    this._users.next([]);
    this._done.next(false);
    this._loading.next(true);
  }
}
