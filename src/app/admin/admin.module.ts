import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CreateCandidateComponent,
    UpdateCandidateComponent,
    ListCandidatesComponent,
    AdminDashboardComponent
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
