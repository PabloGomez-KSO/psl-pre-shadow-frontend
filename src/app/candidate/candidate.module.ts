import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidateInformationComponent } from "./candidate-information/candidate-information.component";
import { CandidateNavbarComponent } from "./candidate-navbar/candidate-navbar.component";
import { CandidateDashboardComponent } from "./candidate-dashboard/candidate-dashboard.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule
  ],
  declarations: [
    CandidateInformationComponent,
    CandidateNavbarComponent,
    CandidateDashboardComponent
  ],
  exports: [
    CandidateDashboardComponent
  ]
})
export class CandidateModule {}
