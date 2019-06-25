import {AngularFirestore} from '@angular/fire/firestore';
import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

export class CustomEmailValidator {
  static emailValidator(angularFireStore: AngularFirestore) {
    return (control: AbstractControl) => {

      const email = control.value.toLowerCase();
      return angularFireStore.collection('users', ref => ref.where('email', '==', email) )
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(users => users.length ? { emailNotAvailable: true } : null ),
        );
    };
  }

}
