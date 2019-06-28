import * as actions from '../actions';

export function adminReducer(state: string = '', action: actions.AdminActions) {
  switch (action.type) {
    case actions.UPDATE_SEARCH_ADMIN_NAVBAR:
      return action.searchString;
    default:
      return state;
  }
}
