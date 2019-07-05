import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Components
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './components/update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './components/list-candidates/list-candidates.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { SharedModule } from '../shared/shared.module';

// Pipes
import { SortCandidatesPipe } from './pipes/sort-candidates.pipe';
import { ConvertTitlePipe } from './pipes/convert-title.pipe';

// Directives
import { ScrollableDirective } from './directives/scrollable.directive';

// NgRx.
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    CreateCandidateComponent,
    UpdateCandidateComponent,
    ListCandidatesComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    SortCandidatesPipe,
    ConvertTitlePipe,
    ScrollableDirective,
    CandidateFormComponent,
    ListCoursesComponent,
    CourseFormComponent,
    CreateCourseComponent
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
