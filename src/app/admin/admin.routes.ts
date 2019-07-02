import { Routes} from '@angular/router';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './components/update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './components/list-candidates/list-candidates.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import {AuthGuard} from '../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'list_candidates', component: ListCandidatesComponent, canActivate: [AuthGuard] },
  { path: 'list_courses', component: ListCoursesComponent, canActivate: [AuthGuard] },
  { path: 'update_candidate/:id', component: UpdateCandidateComponent, canActivate: [AuthGuard]},
  { path: 'create_candidate', component: CreateCandidateComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'list_candidates' }
];
