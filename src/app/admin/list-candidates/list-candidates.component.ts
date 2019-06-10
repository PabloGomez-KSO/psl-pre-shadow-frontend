import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { User } from '../../shared/models/user';
import { AdminHelperService } from '../services/admin-helper.service';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit {
  candidates: User[] = [];
  candidatesComplete: User[] = [];
  criteriaOptions: string[] = [];
  selectedCriteriaToSearch = '';
  isSortedAscendent = true;

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
    this.adminHelper.getGeneralSearchValue().subscribe((searchValue: string) => this.generalSearch(searchValue));
    this.criteriaOptions = this.adminHelper.getCriteraOptions();
  }

  getCandidates(): void{
    this.userApiService.getCandidates().subscribe((candidates: User[]) => {
      this.candidates = candidates;
      this.candidatesComplete = candidates;
      this.defaultSort();
    });
  }

  defaultSort(): void {
    this.sortByCriteria('name');
  }

  editCandidate(id: string): void {
    this.router.navigate(['/admin-dashboard/update_candidate', id]);
  }

  executeSort(selectedCriteria: string): void{
    this.isSortedAscendent = !this.isSortedAscendent;
    this.sortByCriteria(selectedCriteria);
  }

  createCandidate(): void {
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  searchByCriteria(term: string): void {
    this.candidates = _.filter(this.candidatesComplete, (cand: User) =>
      _.startsWith(cand[this.selectedCriteriaToSearch], term)
    );
  }

  generalSearch(term: string): void{
    let candidatesThatApply: User[] = [];

    this.criteriaOptions.forEach((criteria) => {
      candidatesThatApply = _.concat(candidatesThatApply,_.filter(this.candidatesComplete,
         (cand: User) =>  _.startsWith(cand[criteria], term)) );
    });

    this.candidates = _.uniq(candidatesThatApply);
  }

  sortByCriteria(criteriaToSort: string): void {
    const wayOfOrder = this.isSortedAscendent ? 'asc' : 'desc';
    if ( criteriaToSort === 'startDate' || criteriaToSort === 'releaseDate') {
      this.candidates = _.orderBy(this.candidatesComplete,
        (cand: User) => moment(cand[criteriaToSort]), wayOfOrder);
    } else {
      this.candidates = _.orderBy(this.candidatesComplete, criteriaToSort, wayOfOrder);
    }
  }
}
