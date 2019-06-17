import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/notifications/alert.service';
import { AdminHelperService } from '../services/admin-helper.service';

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
    this.candidateForm = this.adminHelper.getCandidateCreateFormValidator();
  }

  onCreateCandidate() {
    if (this.candidateForm.valid) {
      this.authService
      .registerUser({...this.user}, this.password)
      .then(() => {
        this.alertService.showSuccessMessage('User succesfully created');
        this.router.navigate(['/admin-dashboard/']);
      })
      .catch(err => {
        this.alertService.showInvalidMessage(err);
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin-dashboard/']);
  }
}
