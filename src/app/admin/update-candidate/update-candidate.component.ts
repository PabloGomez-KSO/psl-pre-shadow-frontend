import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { UserApiService } from '../../shared/services/user-api.service';
import { AlertService } from '../../shared/notifications/alert.service';
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss']
})
export class UpdateCandidateComponent implements OnInit {

  updateCandidateForm: FormGroup;
  candidateToUpdate: User;
  softwareRoles: string[];

  constructor(
    private adminHelper: AdminHelperService,
    private router: Router,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.candidateToUpdate = this.adminHelper.getUserRebooted();
    this.setFormValidators();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    const userIdToUpdate = this.activatedRoute.snapshot.params.id;
    this.userApiService.getUserById(userIdToUpdate).subscribe((cand: User) => {
     this.candidateToUpdate = cand;
     this.candidateToUpdate.startDate = this.setNgBootstrapDate(this.candidateToUpdate.startDate);
     this.candidateToUpdate.releaseDate = this.setNgBootstrapDate(this.candidateToUpdate.releaseDate);
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
    this.userApiService.
          updateUser(this.candidateToUpdate).then(() =>
            this.alertService.showSuccessMessage('User updated successfully'));
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard/']);
  }
}
