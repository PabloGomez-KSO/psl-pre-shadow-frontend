import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../shared/services/user-api.service';
import { User } from '../../shared/models/user';
import { AdminHelperService } from '../services/admin-helper.service';
import { AdminApiService } from '../services/admin-api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from '../../shared/notifications/alert.service';
import { Subscription, Observable, of } from 'rxjs';
import { scan, tap } from 'rxjs/operators';

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
  searchSubscription: Subscription;

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService,
    private alertService: AlertService,
    private adminApiService: AdminApiService
  ) { }

  ngOnInit(): void {
    this.getPage();
    this.criteriaOptions = this.adminHelper.getCriteraOptions();
    this.initObservables();
  }

  scrollHandler(scrollEvent): void {
    if (scrollEvent === 'bottom' && !this.adminApiService._done.value) {
      this.getPage();
    }
  }

  getPage() {
    // if(!isLoading) {
    if (this.candidates.length) {
      const lastVisibleDocument = this.getLastVisibileDocument();
      this.adminApiService.getMoreUsers(lastVisibleDocument);
    } else {
      this.adminApiService.getFirstBatchOfUsers();
    }
    // }
  }

  getLastVisibileDocument() {
    const candidatesArraySize = this.candidates.length;
    console.log('el ultimo documento visible', this.candidates[candidatesArraySize - 1]);
    return this.candidates[candidatesArraySize - 1].doc;
  }

  initObservables(): void {
    this.searchSubscription = this.adminHelper.getGeneralSearchValue()
      .subscribe((searchValue: string) => this.generalSearch(searchValue));

    this.userSubscription = this.adminApiService._users.pipe(
      scan((currentUsers, newUsers) => {
        console.log(currentUsers);
        console.log(newUsers);
        this.addUsers(newUsers);
        return currentUsers.concat(newUsers);
      })
    ).subscribe();
  }

  addUsers(users: User[]): void {
    this.candidates.push(...users);
    // TODO: ARREGLAR ESTO
    // this.candidatesComplete = users;
    this.selectedCriteriaToSort = 'name';
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
        this.userApiService.deleteUserById(id);
        this.alertService.showDeleteNotification();
        this.candidates = [];
        this.getPage();
      }
    });
  }

  createCandidate(): void {
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  searchByCriteria(term: string): void {
    this.candidates = _.filter(this.candidatesComplete, (user: User) => {
      if (user.roles.candidate) {
        return _.includes(
          user[this.selectedCriteriaToSearch].toString().toLowerCase(),
          term.toLowerCase()
        );
      }
    });
  }

  generalSearch(term: string): void {

    let candidatesThatApply: User[] = [];

    this.criteriaOptions.forEach(criteria => {
      candidatesThatApply = _.concat(candidatesThatApply,
        _.filter(this.candidatesComplete, (user: User) => {
          if (user.roles.candidate) {
            return _.includes(
              user[criteria].toString().toLowerCase(), term.toLowerCase()
            );
          }
        }
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
    this.searchSubscription.unsubscribe();
  }
}
