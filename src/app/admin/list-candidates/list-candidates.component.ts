import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { User } from '../../shared/models/user';
import * as _ from 'lodash';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit {
  candidates: User[] = [];
  candidatesComplete: User[] = [];

  criteriaOptions: string[] = [
    'name',
    'email',
    'age',
    'startDate',
    'releaseDate',
    'preference'
  ];

  selectedCriteriaToSearch = '';

  constructor(private router: Router, private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.userApiService.getCandidates().subscribe((candidates: User[]) => {
      this.candidates = candidates;
      this.candidatesComplete = candidates;
    });
  }

  editCandidate() {
    this.router.navigate(['/admin-dashboard/update_candidate']);
  }

  createCandidate() {
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  searchByCriteria(term: string) {
    this.candidates = _.filter(this.candidatesComplete, (cand: User) =>
      _.startsWith(cand[this.selectedCriteriaToSearch], term)
    );
  }

  sortCandidatesAscendent() {
    this.candidates = _.sortBy(this.candidatesComplete, this.selectedCriteriaToSearch, ['asc']);
  }
}
