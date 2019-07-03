import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../../shared/services/user-api.service';
import { User } from '../../../shared/models/user';
import { AdminHelperService } from '../../services/admin-helper.service';
import { AdminApiService } from '../../services/admin-api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from '../../../shared/notifications/alert.service';
import { Subscription, Subject } from 'rxjs';
import { scan, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SearchNavbarState } from '../../store/interfaces/admin.state';
import { UpdateSearchAction } from '../../store/actions/admin.actions';
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
  termToSearch: string;
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private adminHelper: AdminHelperService,
    private alertService: AlertService,
    private adminApiService: AdminApiService,
    private store: Store<SearchNavbarState>
  ) { }

  ngOnInit(): void {
    this.criteriaOptions = this.adminHelper.getCandidateCriteriaOptions();
    this.initObservables();
    this.getPage();
    this.selectedCriteriaToSort = 'name';
    this.selectedCriteriaToSearch = 'name';
    this.getSearchFromStore();
  }

  scrollHandler(scrollEvent): void {
    if (scrollEvent === 'bottom' && !this.adminApiService._done.value) {
      this.getPage();
    }
  }

  getSearchFromStore() {
    this.store.pipe(select('searchTerm'))
      .subscribe(term => this.termToSearch = term);
  }

  getPage() {
    if (this.candidates.length) {
      const lastVisibleDocument = this.getLastVisibileDocument();
      this.adminApiService.getMoreUsers(lastVisibleDocument).pipe(takeUntil(this.destroy$)).subscribe();
    } else {
      this.adminApiService.getFirstBatchOfUsers().pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  getLastVisibileDocument() {
    const candidatesArraySize = this.candidates.length;
    return this.candidates[candidatesArraySize - 1].doc;
  }

  initObservables(): void {
    this.searchSubscription = this.adminHelper.getGeneralSearchValue()
      .subscribe((searchValue: string) => this.generalSearch(searchValue));

    this.userSubscription = this.adminApiService._users.pipe(
      scan((currentUsers, newUsers) => {
        this.addNewUsers(newUsers);
        return currentUsers.concat(newUsers);
      })
    ).subscribe();
  }

  addNewUsers(users: User[]): void {
    this.candidates.push(...users);
    this.candidatesComplete.push(...users);
  }

  sortWhenClicked(option: string): void {
    if (this.selectedCriteriaToSort !== option) {
      this.selectedCriteriaToSort = option;
      this.isSortedAscendent = true;
    } else {
      this.isSortedAscendent = !this.isSortedAscendent;
    }
    this.sortByCriteria();
  }

  editCandidate(id: string): void {
    this.router.navigate(['/admin-dashboard/update_candidate', id]);
  }

  removeCandidate(id: string) {
    this.alertService.showAskNotification('Are you sure about this ?', 'You wont be able to see the candidate anymore!', 'warning')
      .subscribe(result => {
        if (result.value) {
          this.userApiService.deleteUserById(id).subscribe();
          this.alertService.showMessage('Candidate has been deleted', 'info', false);
          this.candidates = [];
          this.candidatesComplete = [];
        }
      });
  }

  createCandidate(): void {
    this.adminApiService.reset();
    this.router.navigate(['/admin-dashboard/create_candidate']);
  }

  searchByCriteria(term: string): void {

    const updateAction = new UpdateSearchAction(term);
    this.store.dispatch(updateAction);

    if (this.selectedCriteriaToSearch) {
      this.candidates = _.filter(this.candidatesComplete, (user: User) => {
        if (user.roles.candidate) {
          return _.includes(user[this.selectedCriteriaToSearch].toString().toLowerCase(), this.termToSearch.toLowerCase());
        }
      });
    }
  }

  generalSearch(term: string): void {

    let candidatesThatApply: User[] = [];

    this.criteriaOptions.forEach(criteria => {
      candidatesThatApply = _.concat(candidatesThatApply,
        _.filter(this.candidatesComplete, (user: User) => {
          if (user.roles.candidate) {
            return _.includes(user[criteria].toString().toLowerCase(), term.toLowerCase());
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
    this.destroy$.next(true);
  }
}
