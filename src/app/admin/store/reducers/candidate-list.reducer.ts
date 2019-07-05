import * as actions from '../actions';

export interface SearchState {
  searchTerm: string;
}

export const initialState: SearchState = {
  searchTerm: ''
};

export function reducer(state = initialState, action: actions.CandidateListActions): SearchState {
  switch (action.type) {
    case actions.UPDATE_SEARCH_ADMIN_NAVBAR:
      return {
        searchTerm: action.searchString
      };
    default:
      return {
        ...state
      };
  }
}
