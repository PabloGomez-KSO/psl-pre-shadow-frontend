import { Routes} from '@angular/router';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { UpdateCandidateComponent } from './components/update-candidate/update-candidate.component';
import { ListCandidatesComponent } from './components/list-candidates/list-candidates.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { AuthGuardAdmin } from '../core/guards/admin.auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'list_candidates', component: ListCandidatesComponent, canActivate: [ AuthGuardAdmin] },
  { path: 'list_courses', component: ListCoursesComponent, canActivate: [ AuthGuardAdmin] },
  { path: 'update_candidate/:id', component: UpdateCandidateComponent, canActivate: [ AuthGuardAdmin]},
  { path: 'create_candidate', component: CreateCandidateComponent, canActivate: [ AuthGuardAdmin]},
  { path: 'create_course', component: CreateCourseComponent, canActivate: [ AuthGuardAdmin]},
  { path: '**', pathMatch: 'full', redirectTo: 'list_candidates' }
];
