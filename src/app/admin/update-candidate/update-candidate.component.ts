import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { UserApiService } from '../../shared/services/user-api.service';
import { AlertService } from '../../shared/notifications/alert.service';
import { HelperService } from '../../shared/services/helper.service';
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss']
})
export class UpdateCandidateComponent implements OnInit {

  updateCandidateForm: FormGroup;
  user: User;
  softwareRoles: string[];
  action = 'update';

  constructor(
    private adminHelper: AdminHelperService,
    private helperService: HelperService,
    private router: Router,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    // this.user = this.adminHelper.getUserRebooted();
    // this.setFormValidators();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    const userIdToUpdate = this.activatedRoute.snapshot.params.id;
    this.userApiService.getUserById(userIdToUpdate).subscribe((cand: User) => {
      this.user = cand;
      this.user.startDate = this.setNgBootstrapDate(this.user.startDate);
      this.user.releaseDate = this.setNgBootstrapDate(this.user.releaseDate);
      console.log(this.user);
    }
    );
  }

  setFormValidators(): void {
    this.updateCandidateForm = this.adminHelper.getUpdateFormValidator();
  }

  setNgBootstrapDate(stringDate: string) {
    return this.adminHelper.convertStringIntoNgBootstrapDate(stringDate);
  }

  updateCandidate(): void {
    this.castUserDates();
    this.userApiService.
      updateUser(this.user).then(() =>
        this.alertService.showSuccessMessage('User updated successfully'));
  }

  castUserDates() {
    this.user.startDate = this.helperService.castNgbDateStructIntoString(this.user.startDate);
    this.user.releaseDate = this.helperService.castNgbDateStructIntoString(this.user.releaseDate);
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard/']);
  }
}
