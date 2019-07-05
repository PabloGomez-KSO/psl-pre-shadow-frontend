import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Course } from '../../../shared/models/course';
import { Router } from '@angular/router';
import { CourseDispatchersService } from '../../store/services/course.dispatchers.service';
import { CourseSelectors } from '../../store/services/course.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit, OnDestroy {

  criteriaOptions: string[];
  selectedCriteriaToSearch: string;
  termToSearch: string;
  courses: Course[];
  loading = false;
  destroy$: Subject<boolean> = new Subject();

  constructor(private adminHelper: AdminHelperService,
    private router: Router,
    private courseDispatchers: CourseDispatchersService,
    private courseSelectors: CourseSelectors
  ) { }

  ngOnInit() {
    this.criteriaOptions = this.adminHelper.getCourseCriteriaOptions();
    this.selectedCriteriaToSearch = 'name';
    this.initObservables();
    this.courseDispatchers.getCoursesBatch();
  }

  initObservables() {
    this.courseSelectors.courses$.pipe(takeUntil(this.destroy$))
                                 .subscribe(courses => this.courses = courses);

    this.courseSelectors.loading$.pipe(takeUntil(this.destroy$))
                                 .subscribe((loadingStatus) => this.loading = loadingStatus);
  }

  scrollHandler(scrollEvent): void {
    if (scrollEvent === 'bottom') {
      this.courseDispatchers.getCoursesBatch();
    }
  }

  searchByCriteria(term: string) {
    console.log(term);
  }

  createCourse() {
    this.router.navigate(['/admin-dashboard/create_course']);
  }

  ngOnDestroy(): void {
     this.destroy$.next(true);
     this.courseDispatchers.resetCoursesState();
  }
}
