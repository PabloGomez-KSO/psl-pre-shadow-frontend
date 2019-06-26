import {AngularFirestore} from '@angular/fire/firestore';
import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

export class CustomUsernameValidator {
  static usernameValidator(angularFireStore: AngularFirestore) {
    return (control: AbstractControl) => {

      console.log(control.get);

      const username = control.value.toLowerCase();
      return angularFireStore.collection('users', ref => ref.where('username', '==', username) )
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(users => users.length ? { usernameNotAvailable: true } : null ),
        );
    };
  }

}
