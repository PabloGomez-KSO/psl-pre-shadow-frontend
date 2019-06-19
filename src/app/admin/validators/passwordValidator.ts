import {FormGroup} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(form: FormGroup) {
       const password = form.get('password').value;
       const confirmPassword = form.get('cpassword').value;
        if (password !== confirmPassword) {
            form.get('cpassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
