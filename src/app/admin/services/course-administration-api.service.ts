import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Course } from 'src/app/shared/models/course';
import { from } from 'rxjs/internal/observable/from';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';

@Injectable({
  providedIn: 'root'
})
export class CourseAdministrationApiService {
  private coursesCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;
  private batchSize = 4;

  constructor(private angularFireStore: AngularFirestore) {
    this.coursesCollection = angularFireStore.collection<Course>('courses');
    this.courses = this.coursesCollection.valueChanges();
  }

  addCourse(course: Course) {
    const idGenerated = this.angularFireStore.createId();
    const courseToDB: Course = { ...course, id: idGenerated };
    return from(this.coursesCollection.doc(idGenerated).set(courseToDB));
  }

  getAllCourses() {
    return this.coursesCollection.snapshotChanges().pipe(map(changes => this.handleCourses(changes)));
  }

  handleCourses(changes) {
    return changes.map(action => this.getCourseDataFromActionObject(action));
  }

  getCourseDataFromActionObject(action): Course {
    return action.payload.doc.data() as Course;
  }

  getFirstBatchOfCourses(): Observable<any> {
    console.log('por aca pidio el efecto');
    console.log(this.batchSize);
    const firstBatch = this.angularFireStore.collection(
      'courses',
      ref => ref.orderBy('name').limit(this.batchSize)
    );

    return this.mapAndUpdate(firstBatch);
  }

  getMoreCourses(lastVisibleDocument): Observable<any> {
    const coursesBatch = this.angularFireStore.collection('courses', ref => {
      return ref
        .orderBy('name')
        .limit(this.batchSize)
        .startAfter(lastVisibleDocument);
    });

    return this.mapAndUpdate(coursesBatch);
  }

  mapAndUpdate(coursesCollection: AngularFirestoreCollection<any>): Observable<any> {

    return coursesCollection
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(arr =>
          arr.map(action => {
            const data = action.payload.doc.data();
            const doc = action.payload.doc;
            return { ...data, doc };
          })
        )
      );
  }

}
