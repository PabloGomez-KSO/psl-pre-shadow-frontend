import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Router } from '@angular/router';
import { enumActions } from '../formActions.enum';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input() action: string;
  @Output() formValueEmitted = new EventEmitter<Course>();
  softwareRoles: string[];
  courseForm: FormGroup;
  formActions: any = enumActions;
  topics: FormArray;

  constructor(private formBuilder: FormBuilder,
              private adminHelper: AdminHelperService,
              private router: Router
             ) {
  }

  ngOnInit() {
    this.initializeCourseForm();
    this.addTopic();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
  }

  initializeCourseForm() {
    this.courseForm = this.formBuilder.group(
      {
        name: [ '', [Validators.required , Validators.minLength(3)]],
        category: ['', [Validators.required]],
        duration: [ '', [Validators.required, Validators.minLength(3)]],
        numberOfCandidates: ['', [Validators.required, Validators.min(1)]],
        topics: new FormArray([])
      }
    );
  }

  get topicsArray() {
    return this.courseForm.get('topics') as FormArray;
  }

  addTopic(): void {
    this.topicsArray.push(this.createTopic());
  }

  deleteTopicControl(index: number): void {
    if (this.topicsArray.length > 1) {
      this.topicsArray.removeAt(index);
    }
  }

  createTopic(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.courseForm.valid) {
      this.formValueEmitted.emit(this.courseForm.value);
    }
  }

  goBack() {
    this.router.navigate(['/admin-dashboard/list_courses']);
  }
}
