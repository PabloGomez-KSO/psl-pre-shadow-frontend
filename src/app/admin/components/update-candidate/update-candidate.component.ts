import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminHelperService } from '../../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { UserApiService } from '../../../shared/services/user-api.service';
import { HelperService } from '../../../shared/services/helper.service';
import { AlertService } from '../../../shared/notifications/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html'
})
export class UpdateCandidateComponent implements OnInit {
  updateCandidateForm: FormGroup;
  user: User;
  softwareRoles: string[];
  action = 'update';
  isUserInitialized = false;

  constructor(
    private adminHelper: AdminHelperService,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    const userIdToUpdate = this.activatedRoute.snapshot.params.id;
    this.userApiService.getUserById(userIdToUpdate).subscribe((cand: User) => {
      this.user = cand;
      this.user.startDate = this.setNgBootstrapDate(this.user.startDate);
      this.user.releaseDate = this.setNgBootstrapDate(this.user.releaseDate);
      this.isUserInitialized = true;
    }
    );
  }

  setNgBootstrapDate(stringDate: string) {
    return this.adminHelper.convertStringIntoNgBootstrapDate(stringDate);
  }

  getFormOutput($userEmmited) {
    this.user = { ...$userEmmited, id: this.user.id };
    this.updateCandidate();
  }


  updateCandidate(): void {
    this.castUserDates();
    this.userApiService.
      updateUser(this.user).subscribe(() => {
        this.alertService.showMessage('User updated successfully', 'success', false);
        this.router.navigate(['/admin-dashboard/']);
      });
  }

  castUserDates() {
    this.user.startDate = this.helperService.castNgbDateStructIntoString(this.user.startDate);
    this.user.releaseDate = this.helperService.castNgbDateStructIntoString(this.user.releaseDate);
  }

}
