import { Routes} from '@angular/router';
import { CandidateInformationComponent } from "./candidate-information/candidate-information.component";
import { CandidateDashboardComponent } from "./candidate-dashboard/candidate-dashboard.component";
import { AuthGuardCandidate } from '../core/guards/candidate.auth.guard';

export const CANDIDATE_ROUTES: Routes = [
  { path: 'info', component: CandidateInformationComponent, canActivate: [AuthGuardCandidate]},
  { path: 'candidate_dashboard', component: CandidateDashboardComponent, canActivate: [AuthGuardCandidate]},
  { path: '**', pathMatch: 'full', redirectTo: 'info' }
];
