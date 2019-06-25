import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PasswordValidation } from '../../validators/passwordValidator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminHelperService } from '../../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { enumActions } from './formActions.enum';
import { Subscription } from 'rxjs';
import { CustomEmailValidator } from '../../validators/emailValidator';
import { CustomUsernameValidator } from '../../validators/usernameValidator';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  @Input() action: string;
  @Input() user: User;
  @Output() formValueEmitted = new EventEmitter<User>();

  candidateForm: FormGroup;
  softwareRoles: string[];
  formActions: any = enumActions;
  authRegisterSubscription: Subscription;

  constructor(
    private router: Router,
    private adminHelper: AdminHelperService,
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    this.candidateForm = this.getCandidateForm();
    console.log(this.user);
    this.setUpdateControlsAndInputs();
  }

  setUpdateControlsAndInputs() {
    if (this.action === this.formActions.updateAction) {
      this.candidateForm.controls.password.disable({ onlySelf: true });
      this.candidateForm.controls.cpassword.disable({ onlySelf: true });
      this.candidateForm.controls.email.disable({ onlySelf: true });
      this.candidateForm.controls.username.disable({ onlySelf: true });
    }
  }

  getCandidateForm() {

    return this.formBuilder.group(
      {
        name: [this.user.name, [Validators.required, Validators.minLength(4)]],
        age: [this.user.age, [Validators.required, Validators.min(18)]],
        email: ['', Validators.required, CustomEmailValidator.emailValidator(this.angularFirestore)],
        username: [this.user.username, [Validators.required, Validators.min(3)],
        CustomUsernameValidator.usernameValidator(this.angularFirestore)],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
        startDate: [this.user.startDate, [Validators.required]],
        releaseDate: [this.user.releaseDate, [Validators.required]],
        preference: [this.user.preference, [Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin-dashboard/']);
  }

  submitForm(): void {
    if (this.candidateForm.valid) {
      this.formValueEmitted.emit(this.candidateForm.value);
    }
  }

  get email() {
    return this.candidateForm.get('email');
  }

  get username() {
    return this.candidateForm.get('username');
  }
}
