import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(control: AbstractControl) {
       const password = control.get('password').value;
       const confirmPassword = control.get('cpassword').value;
        if (password !== confirmPassword) {
            control.get('cpassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
