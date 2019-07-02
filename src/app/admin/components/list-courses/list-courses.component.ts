import { Component, OnInit } from '@angular/core';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Course } from '../../../shared/models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  criteriaOptions: string[];
  selectedCriteriaToSearch: string;
  termToSearch: string;
  fakeCourses: Course[];

  constructor(private adminHelper: AdminHelperService,
              private router: Router
          ) { }

  ngOnInit() {
    this.criteriaOptions = this.adminHelper.getCourseCriteriaOptions();
    this.selectedCriteriaToSearch = 'name';
    this.setFakeArray();
  }

  searchByCriteria(term: string) {
    console.log(term);
  }

  createCourse() {
    this.router.navigate(['/admin-dashboard/create_course']);
  }

  setFakeArray() {
    const course1: Course = {
      name: 'NgRx Background',
      numberOfCandidates: 5,
      duration: '2 week',
      topics: [
        { name: 'Gentile Introduction to NgRx', link: 'www.test1.com' },
        { name: 'Store, Reducer and Actions', link: 'www.test2.com' },
        { name: 'Selectors, Effects and Entities', link: 'www.test2.com' }
      ],
      category: 'Frontend'
    };

    const course2: Course = {
      name: 'CSS Fundamentals',
      numberOfCandidates: 10,
      duration: '5 week',
      topics: [
        { name: 'Selectors', link: 'www.test1.com' },
        { name: 'Combinators', link: 'www.test2.com' },
        { name: 'Position of elements', link: 'www.udemy.com' }
      ],
      category: 'Frontend'
    };

    const course3: Course = {
      name: 'Angular Forms',
      numberOfCandidates: 5,
      duration: '4 week',
      topics: [
        { name: 'Approach with template', link: 'www.test1.com' },
        { name: 'Approach with reactive forms', link: 'www.test2.com' }
      ],
      category: 'Frontend'
    };

    const course4: Course = {
      name: 'React',
      numberOfCandidates: 5,
      duration: '7 week',
      topics: [
        { name: 'Introduction', link: 'www.test1.com' },
        { name: 'Components and props', link: 'www.test2.com' },
        { name: 'Rendering Elements', link: 'www.test3.com' },
        { name: 'Lifecycle', link: 'www.test4.com' }
      ],
      category: 'Frontend'
    };

    const course5: Course = {
      name: 'Advanced CSS',
      numberOfCandidates: 5,
      duration: '1 week',
      topics: [
        { name: 'FlexBox', link: 'www.test1.com' },
        { name: 'Grid', link: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout' },
        { name: 'Animations', link: 'www.test2.com' },
      ],
      category: 'Frontend'
    };

    const course6: Course = {
      name: 'GraphQL Fundamentals',
      numberOfCandidates: 5,
      duration: '2 week',
      topics: [
        { name: 'Introduction', link: 'www.test1.com' },
      ],
      category: 'Backend'
    };


    const course7: Course = {
      name: 'Java Spring',
      numberOfCandidates: 7,
      duration: '1 week',
      topics: [
        { name: 'Introduction', link: 'www.test1.com' },
        { name: 'Rest API', link: 'www.test1.com' },
      ],
      category: 'Backend'
    };

    const course8: Course = {
      name: 'RxJs Observables',
      numberOfCandidates: 7,
      duration: '3 week',
      topics: [
        { name: 'Introduction', link: 'www.test1.com' },
        { name: 'RxJs OPERATORS', link: 'www.test1.com' },
        { name: 'Observer and Iterator pattern', link: 'www.test1.com' },
      ],
      category: 'Frontend'
    };

    const course9: Course = {
      name: 'Firebase',
      numberOfCandidates: 7,
      duration: '4 week',
      topics: [
        { name: 'FireAuth', link: 'www.test1.com' },
        { name: 'FireStore', link: 'www.test1.com' },
      ],
      category: 'Frontend'
    };

    this.fakeCourses = [course1, course2, course3, course4, course5, course6, course7, course8, course9];
  }

}
