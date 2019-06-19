import { Component, OnInit, Input } from '@angular/core';
import { PasswordValidation } from '../validators/passwordValidator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { enumActions } from './formActions.enum';
import { HelperService } from '../../shared/services/helper.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/notifications/alert.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})

export class CandidateFormComponent implements OnInit {
  @Input() action: string;
  @Input() user: User;
  candidateForm: FormGroup;
  softwareRoles: string[];
  formActions: any = enumActions;
  authRegisterSubscription: Subscription;

  constructor(
    private router: Router,
    private adminHelper: AdminHelperService,
    private alertService: AlertService,
    private authService: AuthService,
    private helperService: HelperService
  ) {
  }

  ngOnInit() {
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    this.candidateForm = this.getCandidateForm();
    this.setUpdateControlsAndInputs();

    console.log(this.action);
   console.log(this.user);
  }

  setUpdateControlsAndInputs() {
    if (this.action === this.formActions.updateAction) {
      this.candidateForm.controls.password.disable({onlySelf: true});
      this.candidateForm.controls.cpassword.disable({onlySelf: true});
      this.candidateForm.controls.email.disable({onlySelf: true});
    }
  }

  getCandidateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
      age: new FormControl(this.user.age, [Validators.required, Validators.min(18)]),
      username: new FormControl(this.user.username, [Validators.required, Validators.min(3)]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
      start_date: new FormControl(this.user.startDate, [Validators.required]),
      release_date: new FormControl(this.user.releaseDate, [Validators.required]),
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
    if (this.action === this.formActions.createAction) {
      this.createCandidate();
    } else {
    }
  }

  createCandidate() {
    const userToRegister: User = this.adminHelper.setUserWithFormValues(this.candidateForm.value);
    if (this.candidateForm.valid) {
      this.authRegisterSubscription = this.authService.registerUser(userToRegister).subscribe(
        () => {
          this.alertService.showSuccessMessage('User succesfully created');
          this.goBack();
        },
        error => {
          this.alertService.showInvalidMessage(error.message);
        }
      );
    }
  }

  updateCandidate() {

  }

  setNgBootstrapDate(stringDate: string) {
    return this.adminHelper.convertStringIntoNgBootstrapDate(stringDate);
  }

  castUserDates ()  {
    this.user.startDate = this.helperService.castNgbDateStructIntoString(this.user.startDate);
    this.user.releaseDate = this.helperService.castNgbDateStructIntoString(this.user.releaseDate);
  }

}
