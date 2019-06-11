import { Roles } from './roles';
import {NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface User {
  id?: string;
  name?: string;
  email: string;
  age?: number;
  startDate?: string;
  releaseDate?: string;
  preference?: string;
  username?: string;
  roles: Roles;
}
