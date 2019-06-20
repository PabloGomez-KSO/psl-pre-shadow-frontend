import { Injectable } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {
  }

  castNgbDateStructIntoString(date): string {
    return this.ngbDateParserFormatter.format(date);
  }

  setCandidateForDatabase(userId: string, user: User): User {
    user.startDate = this.castNgbDateStructIntoString(user.startDate);
    user.releaseDate = this.castNgbDateStructIntoString(user.releaseDate);

    const userForDatabase: User = {
      ...user,
      id: userId,
      roles: {
        candidate: true
      }
    };

    return userForDatabase;
  }

}

