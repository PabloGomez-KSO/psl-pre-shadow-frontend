import { Component, OnInit } from '@angular/core';
import { AdminHelperService } from '../../services/admin-helper.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  criteriaOptions: string[];
  selectedCriteriaToSearch: string;

  constructor(private adminHelper: AdminHelperService) { }

  ngOnInit() {
    this.criteriaOptions = this.adminHelper.getCourseCriteriaOptions();
    console.log(this.criteriaOptions);
    this.selectedCriteriaToSearch = 'name';
  }

  searchByCriteria(term: string){
    console.log(term);
  }

}
