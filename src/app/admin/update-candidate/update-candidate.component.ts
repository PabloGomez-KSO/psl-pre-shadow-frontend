import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
import { UserApiService } from '../../core/services/user-api.service';
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
    private activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.candidateToUpdate = this.adminHelper.getUserRebooted();
    this.setFormValidators();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
    const userIdToUpdate = this.activatedRoute.snapshot.params.id;
    this.userApiService.getUserById(userIdToUpdate).subscribe((cand: User) => this.candidateToUpdate = cand);
  }

  setFormValidators() {
     this.updateCandidateForm = this.adminHelper.getUpdateFormValidator();
  }

  updateCandidate() {
    this.userApiService.updateUser(this.candidateToUpdate).then(data => {
      console.log(data);
    });
  }

  goBack() {
    this.router.navigate(['/admin-dashboard/']);
  }
}
