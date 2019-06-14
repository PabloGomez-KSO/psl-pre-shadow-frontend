import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
   _done = new BehaviorSubject(false);
   _loading = new BehaviorSubject(true);
   _users = new BehaviorSubject([]);

  users: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  batchSize = 13;
  prepend: false;

  constructor(public afs: AngularFirestore) {}

  getFirstBatchOfUsers() {
    const first = this.afs.collection('users', ref => {
      return ref.orderBy('name').limit(this.batchSize);
    });

    this.mapAndUpdate(first);

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

    userCollection
      .snapshotChanges()
      .pipe(
        tap(arr => {
          const values = arr.map(action => {
            const data = action.payload.doc.data();
            const doc = action.payload.doc;
            return { ...data, doc };
          });


          this._users.next(values);
          this._loading.next(true);

          if (!values.length) {
            this._done.next(true);
            this._loading.next(false);
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
