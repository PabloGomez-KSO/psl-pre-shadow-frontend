import { Roles } from './roles';
export interface User {
  id?: string;
  name?: string;
  email: string;
  age?: number;
  startDate?: any;
  releaseDate?: any;
  preference?: string;
  username?: string;
  password?: string;
  roles: Roles;
}
