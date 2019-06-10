import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../shared/models/user';
import * as _ from 'lodash';
import * as moment from 'moment'

@Pipe({
  name: 'sortCandidates'
})
export class SortCandidatesPipe implements PipeTransform {

  transform(value: User[], isAscedent: boolean, criteria: string): User[] {
    const wayOfOrder =  isAscedent ? 'asc' : 'desc';

    if (criteria === 'startDate' || criteria === 'releaseDate') {
      return _.orderBy(value, (cand: User) => moment(cand[criteria]), wayOfOrder);
    }
    return _.orderBy(value, criteria, wayOfOrder);
  }

}
