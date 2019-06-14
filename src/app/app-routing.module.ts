import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent  } from './core/auth/login/login.component';

// Components
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CandidateDashboardComponent } from './candidate/candidate-dashboard/candidate-dashboard.component';

import {AuthGuard} from './core/guards/auth.guard';
// Routes from Admin.
import { ADMIN_ROUTES } from './admin/admin.routes';
// Routes from Candidate.
import { CANDIDATE_ROUTES } from './candidate/candidate.routes';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component:  AdminDashboardComponent, children: ADMIN_ROUTES, canActivate: [AuthGuard]},
  { path: 'candidate_dashboard', component: CandidateDashboardComponent, children: CANDIDATE_ROUTES, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class APP_ROUTES {}
