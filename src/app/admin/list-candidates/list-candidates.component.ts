import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editCandidate(){
    this.router.navigate(['/admin-dashboard/update_candidate']);
  }

}
