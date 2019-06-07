import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminHelperService } from '../services/admin-helper.service';
import { User } from 'src/app/shared/models/user';
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
    private router: Router) {
  }

  ngOnInit() {
    this.setFormValidators();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
  }

  setFormValidators() {
    this.updateCandidateForm = this.adminHelper.getCandidateFormValidators();

  }

  updateCandidate() {

  }

  goBack() {
    this.router.navigate(['/admin-dashboard/']);
  }
}
