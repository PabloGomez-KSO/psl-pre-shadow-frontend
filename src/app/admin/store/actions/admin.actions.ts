import { Action } from '@ngrx/store';

export const SEARCH_NAVBAR = '[Admin] Navbar Search';

export class SearchAction implements Action {
  readonly type = SEARCH_NAVBAR;

  constructor(public searchString: String) {}
}

export type AdminActions = SearchAction;
