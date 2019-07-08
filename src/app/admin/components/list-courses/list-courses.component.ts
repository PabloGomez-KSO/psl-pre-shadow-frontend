import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Course } from '../../../shared/models/course';
import { Router } from '@angular/router';
import { CourseDispatchersService } from '../../store/services/course.dispatchers.service';
import { CourseSelectors } from '../../store/services/course.selectors';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit, OnDestroy {

  criteriaOptions: string[];
  selectedCriteriaToSearch: string;
  termToSearch = '';
  courses: Course[];
  loading = false;
  destroy$: Subject<boolean> = new Subject();
  searchTextChanged = new Subject<string>();

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

    this.searchTextChanged.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(textToSearch => this.searchByCriteria(textToSearch));

  }

  scrollHandler(scrollEvent): void {
    if (scrollEvent === 'bottom' && this.termToSearch === '') {
      this.getBatch();
    }
  }

  getBatch() {
    this.courseDispatchers.getCoursesBatch();
  }

  updateTerm(term: string) {
    this.searchTextChanged.next(term);
  }

  searchByCriteria(termToSearch: string) {
    this.courseDispatchers.resetCoursesState();
    if (termToSearch !== '') {
      this.courseDispatchers.searchCoursesByCriteria(termToSearch, this.selectedCriteriaToSearch);
    } else {
      this.getBatch();
    }
  }

  editCourse(id: string) {
    this.router.navigate(['/admin-dashboard/update_course', id]);
  }

  createCourse() {
    this.router.navigate(['/admin-dashboard/create_course']);
  }

  ngOnDestroy(): void {
     this.destroy$.next(true);
     this.courseDispatchers.resetCoursesState();
  }
}
