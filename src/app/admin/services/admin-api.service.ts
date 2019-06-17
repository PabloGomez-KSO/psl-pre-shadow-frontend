import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { scan, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  _done = new BehaviorSubject(false);
  _loading = new BehaviorSubject(false);
  _users = new BehaviorSubject([]);

  users: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  userCollectionSubsciption: Subscription;

  batchSize = 12;
  prepend: false;

  constructor(public afs: AngularFirestore) { }

  getFirstBatchOfUsers() {
    const firstBatch = this.afs.collection('users', ref => {
      return ref.orderBy('name').limit(this.batchSize);
    });

   // firstBatch.snapshotChanges().pipe(map(changes => changes.map(action => console.log(action.payload.doc.data())))).subscribe();

    this.mapAndUpdate(firstBatch);

    this.users = this._users.asObservable().pipe(
      scan((acc, val) => {
        return this.prepend ? val.concat(acc) : acc.concat(val);
      })
    );
  }

  getCursor() {
    const current = this._users.value;
    if (current.length) {
      return this.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  getMoreUsers() {
    const cursor = this.getCursor();

    const more = this.afs.collection('users', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  mapAndUpdate(userCollection: AngularFirestoreCollection<any>) {
    if (this._done.value) {
      return null;
    }

    this._loading.next(true);


    userCollection.snapshotChanges().pipe(map(changes => changes.map(action => console.log(action.payload.doc.data())))).subscribe();

     userCollection
      .snapshotChanges()
      .pipe(
        tap(arr => {
          const values = arr.map(action => {
            const data = action.payload.doc.data();
            console.log(data);
            const doc = action.payload.doc;
            return { ...data, doc };
          });

          this._users.next(values);
          this._loading.next(false);

          if (!values.length) {
            this._done.next(true);
          }
        })
      )
      .subscribe();
  }

  reset() {
    this._users.next([]);
    this._done.next(false);
    this._loading.next(true);
  }
}