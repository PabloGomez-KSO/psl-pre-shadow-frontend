import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  action: string;

  constructor() { }

  ngOnInit() {
    this.action = 'creation';
  }

  getFormOutput($courseEmmited) {
    console.log($courseEmmited);
  }

}
