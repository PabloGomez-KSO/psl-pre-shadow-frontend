import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminHelperService } from '../../services/admin-helper.service';
import { Router } from '@angular/router';
import { enumActions } from '../../utils/formActions.enum';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input() action: string;
  @Input() course: Course;
  @Output() formValueEmitted = new EventEmitter<Course>();
  softwareRoles: string[];
  courseForm: FormGroup;
  formActions: any = enumActions;
  topics: FormArray;

  get topicsArray() {
    return this.courseForm.get('topics') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
    private adminHelper: AdminHelperService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.course);
    this.initializeCourseForm();
    this.initializeTopicsArray();
    this.softwareRoles = this.adminHelper.getSoftwareRoles();
  }

  initializeCourseForm() {
    this.courseForm = this.formBuilder.group(
      {
        name: [this.course.name, [Validators.required, Validators.minLength(3)]],
        category: [this.course.category, [Validators.required]],
        duration: [this.course.duration, [Validators.required, Validators.minLength(3)]],
        numberOfCandidates: [this.course.numberOfCandidates, [Validators.required, Validators.min(1)]],
        topics: new FormArray([])
      }
    );
  }

  addTopic(): void {
    const topicsControlValidity = this.checkControlsStatusOfTopics();

    if (topicsControlValidity) {
      this.topicsArray.push(this.createTopic());
    }
  }

  checkControlsStatusOfTopics(): boolean {

    let controlsValidation = true;

    this.topicsArray.controls
      .forEach(control => {
        if (control.invalid) {
          controlsValidation = false;
        }
      });

    return controlsValidation;
  }

  deleteTopicControl(index: number): void {

    if (this.topicsArray.length > 1) {
      this.topicsArray.removeAt(index);
    }
  }

  initializeTopicsArray() {

    if (!this.course.topics.length) {
      this.addTopic();
    } else {
      this.course.topics
                 .forEach( course =>
                    this.topicsArray.push(this.addTopicInitialized(course.name, course.link)) );
    }
  }

  addTopicInitialized(name: string, link: string): FormGroup {
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      link: [link, [Validators.required]]
    });
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
