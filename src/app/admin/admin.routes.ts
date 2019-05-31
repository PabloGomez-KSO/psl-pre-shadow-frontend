import { Routes} from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import {AuthGuard} from '../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'list_candidates', component: ListCandidatesComponent, canActivate: [AuthGuard] },
  { path: 'update_candidate', component: UpdateCandidateComponent, canActivate: [AuthGuard]},
  { path: 'create_candidate', component: CreateCandidateComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'list_candidates' }
];
