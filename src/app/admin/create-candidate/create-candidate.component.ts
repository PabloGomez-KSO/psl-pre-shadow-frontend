import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/notifications/alert.service';
import { AdminHelperService } from '../services/admin-helper.service';
import { Subscription } from 'rxjs';
import { PasswordValidation } from '../validators/passwordValidator';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {
  password: string;
  user: User;
  candidateForm: FormGroup;
  softwareRoles: string[];
  authRegisterSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private adminHelper: AdminHelperService
  ) { }

  ngOnInit() {
    this.setCandidateFormValidators();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    this.user = this.adminHelper.getUserRebooted();
  }

  setCandidateFormValidators() {

    const userRebooted: User = this.adminHelper.getUserRebooted();

    this.candidateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      age: new FormControl(null, [Validators.required, Validators.min(18)]),
      username: new FormControl('', [Validators.required, Validators.min(3)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
      start_date: new FormControl(null, [Validators.required]),
      release_date: new FormControl(null, [Validators.required]),
      preference: new FormControl('', [Validators.required])
    },
      {
        validators: PasswordValidation.MatchPassword
      }
    );
  }

  onCreateCandidate() {
    const userToRegister: User = this.adminHelper.setUserWithFormValues(this.candidateForm.value);
    if (this.candidateForm.valid) {
      this.authRegisterSubscription = this.authService.registerUser(userToRegister).subscribe(
        () => this.alertService.showSuccessMessage('User succesfully created'),
        error => this.alertService.showInvalidMessage(error.message)
      );
    }
  }

  goBack() {
    this.router.navigate(['/admin-dashboard/']);
  }
}
