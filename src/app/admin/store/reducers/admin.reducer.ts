import * as adminActions from '../actions';

export interface AdminState {
  searchString: string;
}

export function searchReducer(state: string = '', action: adminActions.SearchAction ) {

}
