import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PasswordValidation } from '../validators/passwordValidator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { enumActions } from './formActions.enum';
import { Subscription } from 'rxjs';
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
  ) {
  }

  ngOnInit() {
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    this.candidateForm = this.getCandidateForm();
    this.setUpdateControlsAndInputs();

  }

  setUpdateControlsAndInputs() {
    if (this.action === this.formActions.updateAction) {
      this.candidateForm.controls.password.disable({ onlySelf: true });
      this.candidateForm.controls.cpassword.disable({ onlySelf: true });
      this.candidateForm.controls.email.disable({ onlySelf: true });
    }
  }

  getCandidateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
      age: new FormControl(this.user.age, [Validators.required, Validators.min(18)]),
      username: new FormControl(this.user.username, [Validators.required, Validators.min(3)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
      startDate: new FormControl(this.user.startDate, [Validators.required]),
      releaseDate: new FormControl(this.user.releaseDate, [Validators.required]),
      preference: new FormControl(this.user.preference, [Validators.required])
    },
      {
        validators: PasswordValidation.MatchPassword
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
}
