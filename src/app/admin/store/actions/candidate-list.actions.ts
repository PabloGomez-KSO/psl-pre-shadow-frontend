import { Action } from '@ngrx/store';

export const UPDATE_SEARCH_ADMIN_NAVBAR = '[Admin] Navbar Search';
export class UpdateSearchAction implements Action {
  readonly type = UPDATE_SEARCH_ADMIN_NAVBAR;

  constructor(public searchString: string) {}
}

export type CandidateListActions = UpdateSearchAction;
