import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { scan, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService implements OnDestroy {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(true);
  private _users = new BehaviorSubject([]);

  users: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  batchSize = 9;

  constructor(public afs: AngularFirestore) { }

  getFirstBatchOfUsers() {
    const first = this.afs.collection('users', ref => ref.limit(this.batchSize) );

    this.mapAndUpdate(first);

    this.users = this._users.asObservable().pipe(scan((acc, val) => {
      return acc.concat(val);
    }));

    console.log(this.users);
  }

  getCursor() {
    const current = this._users.value;
    console.log(current.length);
    if (current.length) {
      return current[current.length - 1].doc;
    }
  }

  getMoreUsers() {
    const cursor = this.getCursor();

    if (cursor) {
      const more = this.afs.collection('users', ref => {
        return ref.limit(this.batchSize).startAfter(cursor);
      });
      this.mapAndUpdate(more);
    }
  }

  mapAndUpdate(col: AngularFirestoreCollection<any>) {
    return col.snapshotChanges().pipe(tap(
      arr => {
        const values = arr.map(snap => {
          // console.log(snap);
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc };
        });

        this._users.next(values);
        this._loading.next(true);

        console.log(values.length);

        if (!values.length) {
          this._loading.next(false);
          this._done.next(true);
        }
      }
    ), take(1)).subscribe();
  }

  ngOnDestroy() {
     console.log('servicio destruido');
  }

}



