import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { User } from '../../shared/models/user';
import * as _ from 'lodash';
import { AdminHelperService } from '../services/admin-helper.service';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit {

  candidates: User[] = [];
  candidatesComplete: User[] = [];
  criteriaOptions: string[]  = [];
  selectedCriteria = '';
  isSortedAscendent: boolean = true;

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService
    ) { }

  ngOnInit(): void {
    this.getCandidates();
    this.criteriaOptions = this.adminHelper.getCriteraOptions();
  }

  getCandidates() {
    this.userApiService.getCandidates().subscribe((candidates: User[]) => {
      this.candidates = candidates;
      this.candidatesComplete = candidates;
      this.adminHelper.setCandidates(candidates);
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
      _.startsWith(cand[this.selectedCriteria], term)
    );
  }

  prueba(){
    console.log("ouch me clickearon");
  }

}
