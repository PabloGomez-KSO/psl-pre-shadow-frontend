import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { User } from '../../shared/models/user';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent {
  candidates: User[] = [];

  constructor(private router: Router, private userApiService: UserApiService) {
    this.getCandidates();
  }

  getCandidates() {
    this.userApiService
      .getCandidates()
      .subscribe((candidates: User[]) => (this.candidates = candidates));
  }

  editCandidate() {
    this.router.navigate(['/admin-dashboard/update_candidate']);
  }

  createCandidate() {
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  filterCandidates() {}
}
