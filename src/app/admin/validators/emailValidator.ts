import {AngularFirestore,} from '@angular/fire/firestore';
import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

export class RepeatedEmailValidation {

  static checkeEmailDB(angularFireStore: AngularFirestore) {
    return (control: AbstractControl) => {

      const email = control.value.toLowerCase();

      console.log(email);

      return angularFireStore.collection('users', ref => ref.where('email', '==', email)).
        valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(users => {
            if (users.length) {
              control.setErrors( {emailAvailable: false} );
            } else {
              control.setErrors( null );
            }
          }
        )).subscribe();
    }
  }
}
