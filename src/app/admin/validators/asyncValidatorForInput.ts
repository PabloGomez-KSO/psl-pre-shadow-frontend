import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl } from '@angular/forms';
import { take, map, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

export class CustomValidator {
  static checkValueInDb(angularFireStore: AngularFirestore, inputName: string) {
    return (control: AbstractControl) => {
      const inputValue = control.value.toLowerCase();

      return timer(1000).pipe(
        switchMap(() => {
          return angularFireStore.collection('users', ref => ref.where(inputName, '==', inputValue))
            .snapshotChanges()
            .pipe(
              take(1),
              map(users => users.length ? { valueNotAvailable: true } : null),
            );
        }));
    };
  }
}
