import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState } from '../reducers';
import { SearchState } from '../reducers/candidate-list.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getSearchState = createSelector(
  getEntityState,
  (state: EntityState) => state.searchState
);

const getSearchTerm = createSelector(
  getSearchState,
  (state: SearchState) => state.searchTerm
);


@Injectable({
  providedIn: 'root'
})

export class CandidateListSelectors {
  constructor(private store: Store<EntityState>) {}

  searchTerm$ = this.store.select(getSearchTerm);
}
