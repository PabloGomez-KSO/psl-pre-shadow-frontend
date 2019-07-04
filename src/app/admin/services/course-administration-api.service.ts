import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Course } from 'src/app/shared/models/course';
import { from } from 'rxjs/internal/observable/from';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CourseAdministrationApiService {
  private coursesCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;
  private batchSize: 6;

  constructor(private angularFireStore: AngularFirestore) {
    this.coursesCollection = angularFireStore.collection<Course>('courses');
    this.courses = this.coursesCollection.valueChanges();
  }

  addCourse(course: Course) {
    const idGenerated = this.angularFireStore.createId();
    const courseToDB: Course = {...course, id: idGenerated };
    return from(this.coursesCollection.doc(idGenerated).set(courseToDB));
  }

  getCourses() {
    return this.coursesCollection.snapshotChanges().pipe(map(changes => this.handleCourses(changes)));
  }

  handleCourses(changes) {
    return changes.map(action => this.getCourseDataFromActionObject(action));
  }

  getCourseDataFromActionObject(action): Course {
    return action.payload.doc.data() as Course;
  }

  getFirstBatchOfCourses() {
    const firstBatch = this.angularFireStore.collection(
      'courses',
      ref => ref.orderBy('name').limit(this.batchSize)
    );
  }

  getMoreCourses(lastVisibleDocument) {
    const coursesBatch = this.angularFireStore.collection('courses', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(lastVisibleDocument);
    });
  }

}
