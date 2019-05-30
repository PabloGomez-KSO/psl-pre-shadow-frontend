import { NgModule } from '@angular/core';
import { CommonModule, FormStyle } from '@angular/common';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    CreateCandidateComponent,
    UpdateCandidateComponent,
    ListCandidatesComponent,
    AdminDashboardComponent,
    AdminNavbarComponent
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
