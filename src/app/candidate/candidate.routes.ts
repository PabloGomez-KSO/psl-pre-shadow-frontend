import { Routes} from '@angular/router';
import { CandidateInformationComponent } from "./candidate-information/candidate-information.component";
import { CandidateDashboardComponent } from "./candidate-dashboard/candidate-dashboard.component";
import {AuthGuard} from '../core/guards/auth.guard';

export const CANDIDATE_ROUTES: Routes = [
  { path: 'info', component: CandidateInformationComponent, canActivate: [AuthGuard]},
  { path: 'candidate_dashboard', component: CandidateDashboardComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'info' }
];
