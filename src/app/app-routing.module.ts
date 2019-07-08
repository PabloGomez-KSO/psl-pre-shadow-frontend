import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent  } from './core/auth/login/login.component';

// Components
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { CandidateDashboardComponent } from './candidate/candidate-dashboard/candidate-dashboard.component';

import { AuthGuardAdmin } from './core/guards/admin.auth.guard';
import { AuthGuardCandidate } from './core/guards/candidate.auth.guard';
// Routes from Admin.
import { ADMIN_ROUTES } from './admin/admin.routes';
// Routes from Candidate.
import { CANDIDATE_ROUTES } from './candidate/candidate.routes';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component:  AdminDashboardComponent, children: ADMIN_ROUTES, canActivate: [AuthGuardAdmin]},
  { path: 'candidate_dashboard', component: CandidateDashboardComponent, children: CANDIDATE_ROUTES, canActivate: [AuthGuardCandidate]},
  { path: '**', pathMatch: 'full', redirectTo: 'login'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class APP_ROUTES {}
