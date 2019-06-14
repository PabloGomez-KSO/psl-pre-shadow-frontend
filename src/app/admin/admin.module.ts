import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { SortCandidatesPipe } from './pipes/sort-candidates.pipe';
import { ConvertTitlePipe } from './pipes/convert-title.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollableDirective } from './directives/scrollable.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [
    CreateCandidateComponent,
    UpdateCandidateComponent,
    ListCandidatesComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    SortCandidatesPipe,
    ConvertTitlePipe,
    ScrollableDirective
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
