import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../shared/services/user-api.service';
import { User } from '../../shared/models/user';
import { AdminHelperService } from '../services/admin-helper.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from '../../shared/notifications/alert.service';

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
  selectedCriteriaToSort = '';
  isSortedAscendent = true;

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCandidates();
    this.adminHelper.getGeneralSearchValue().subscribe((searchValue: string) => this.generalSearch(searchValue));
    this.criteriaOptions = this.adminHelper.getCriteraOptions();
  }

  scrollHandler(e) {
    console.log(e);
  }

  getCandidates(): void {
    this.userApiService.getCandidates().subscribe((candidates: User[]) => {
      this.candidates = candidates;
      this.candidatesComplete = candidates;
      this.defaultSort();
    });
  }

  defaultSort(): void {
    this.selectedCriteriaToSort = 'name';
    this.sortByCriteria();
  }

  sortWhenClicked(option: string) {
    if (this.selectedCriteriaToSort !== option) {
      this.selectedCriteriaToSort = option;
      this.isSortedAscendent = true;
      this.sortByCriteria();
    } else {
      this.isSortedAscendent = !this.isSortedAscendent;
      this.sortByCriteria();
    }
  }

  editCandidate(id: string): void {
    this.router.navigate(['/admin-dashboard/update_candidate', id]);
  }

  removeCandidate(id: string) {
    this.alertService.showDeleteAskNotification().then((result) => {
      if (result.value) {
        _.remove(this.candidatesComplete, (cand: User) => cand.id === id);
        this.candidates = this.candidatesComplete;
        this.userApiService.deleteUserById(id);
        this.alertService.showDeleteNotification();
      }
    });
  }

  createCandidate(): void {
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  searchByCriteria(term: string): void {
    this.candidates = _.filter(this.candidatesComplete, (cand: User) => {
      return _.includes(cand[this.selectedCriteriaToSearch].toString().toLowerCase(), term.toLowerCase());
    });
  }

  generalSearch(term: string): void {
    let candidatesThatApply: User[] = [];

    this.criteriaOptions.forEach((criteria) => {
      candidatesThatApply = _.concat(candidatesThatApply, _.filter(this.candidatesComplete,
        (cand: User) => _.includes(cand[criteria].toString().toLowerCase(), term.toLowerCase())));
    });
    this.candidates = _.uniq(candidatesThatApply);
  }

  sortByCriteria(): void {
    const order = this.isSortedAscendent ? 'asc' : 'desc';
    if (this.selectedCriteriaToSort === 'startDate' || this.selectedCriteriaToSort === 'releaseDate') {
      this.candidates = _.orderBy(this.candidatesComplete,
        (cand: User) => moment(cand[this.selectedCriteriaToSort]), order);
    } else {
      this.candidates = _.orderBy(this.candidatesComplete, this.selectedCriteriaToSort, order);
    }
  }
}
