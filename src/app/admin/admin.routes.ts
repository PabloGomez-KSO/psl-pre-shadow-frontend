import { Routes} from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'list_candidates', component: ListCandidatesComponent },
  { path: 'update_candidate', component: UpdateCandidateComponent },
  { path: 'create_candidate', component: CreateCandidateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'list_candidates' }
];
