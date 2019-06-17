import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../shared/services/user-api.service';
import { User } from '../../shared/models/user';
import { AdminHelperService } from '../services/admin-helper.service';
import { AdminApiService } from '../services/admin-api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from '../../shared/notifications/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit, OnDestroy {
  candidates: any[] = [];
  candidatesComplete: User[] = [];
  criteriaOptions: string[] = [];
  selectedCriteriaToSearch = '';
  selectedCriteriaToSort = '';
  isSortedAscendent = true;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService,
    private alertService: AlertService,
    public adminApiService: AdminApiService
  ) { }

  ngOnInit(): void {
    this.adminApiService.getFirstBatchOfUsers();

    console.log(this.candidates);
    console.log(this.candidatesComplete);

    this.adminHelper
      .getGeneralSearchValue()
      .subscribe((searchValue: string) => this.generalSearch(searchValue));
    this.criteriaOptions = this.adminHelper.getCriteraOptions();
    this.userSubscription = this.adminApiService.users.subscribe((users: User[]) =>{
      this.setUsers(users);

    } );
  }

  scrollHandler(e): void {
    if ( e === 'bottom' && !this.adminApiService._done.value) {
      console.log('oelo');
      this.adminApiService.getMoreUsers();
    }
  }

  setUsers(users: User[]): void {
    this.candidates = users;
    this.candidatesComplete = users;
    this.selectedCriteriaToSort = 'name';
  }

  defaultSort(): void {
    this.selectedCriteriaToSort = 'name';
    this.sortByCriteria();
  }

  sortWhenClicked(option: string): void {
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
    this.alertService.showDeleteAskNotification().then(result => {
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
      return _.includes(
        cand[this.selectedCriteriaToSearch].toString().toLowerCase(),
        term.toLowerCase()
      );
    });
  }

  generalSearch(term: string): void {
    let candidatesThatApply: User[] = [];

    this.criteriaOptions.forEach(criteria => {
      candidatesThatApply = _.concat(candidatesThatApply,
        _.filter(this.candidatesComplete, (cand: User) => _.includes(
            cand[criteria].toString().toLowerCase(), term.toLowerCase()
          )
        )
      );
    });
    this.candidates = _.uniq(candidatesThatApply);
  }

  sortByCriteria(): void {
    const order = this.isSortedAscendent ? 'asc' : 'desc';
    if (this.selectedCriteriaToSort === 'startDate' || this.selectedCriteriaToSort === 'releaseDate') {
      this.candidates = _.orderBy(this.candidatesComplete,
        (cand: User) => moment(cand[this.selectedCriteriaToSort]), order
      );
    } else {
      this.candidates = _.orderBy(this.candidatesComplete, this.selectedCriteriaToSort, order);
    }
  }

  ngOnDestroy() {
    this.adminApiService.reset();
    this.userSubscription.unsubscribe();
  }
}
