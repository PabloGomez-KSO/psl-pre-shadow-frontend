import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument
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
  readonly coursesConstant = 'courses';
  private coursesCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;
  private batchSize = 8;

  constructor(private angularFireStore: AngularFirestore) {
    this.coursesCollection = angularFireStore.collection<Course>(this.coursesConstant);
    this.courses = this.coursesCollection.valueChanges();
  }

  addCourse(course: Course) {
    const idGenerated = this.angularFireStore.createId();
    const courseToDB: Course = { ...course, id: idGenerated };
    return from(this.coursesCollection.doc(idGenerated).set(courseToDB));
  }

  getAllCourses(): Observable<Course[]> {
    return this.coursesCollection.snapshotChanges().pipe(map(changes => this.handleCourses(changes)));
  }

  getCourseDocumentById(id: string): AngularFirestoreDocument<Course> {
    return this.angularFireStore.doc<Course>(`courses/${id}`);
  }

  getCourseById(id: string): Observable<Course> {
    const courseDocument = this.getCourseDocumentById(id);

    return courseDocument
           .snapshotChanges()
           .pipe(map((action) => action.payload.data()));

  }

  updateCourse(course: Course, id: string): Observable<any> {
    const courseDocument = this.getCourseDocumentById(id);
    return from(courseDocument.update(course));
  }

  handleCourses(changes): Course[] {
    return changes.map(action => this.getCourseDataFromActionObject(action));
  }

  getCourseDataFromActionObject(action): Course {
    return action.payload.doc.data();
  }

  searchByCriteria(text, criteria): Observable<Course[]> {

    const endText = text + '\uf8ff';

    const coursesCollection = this.angularFireStore.collection(this.coursesConstant, ref =>
      ref
        .orderBy(criteria)
        .startAt(text)
        .endAt(endText)
    );

    return this.mapAndUpdate(coursesCollection);
  }

  getCourses(lastVisibleDocument): Observable<Course[]> {

    let coursesBatch;

    if (lastVisibleDocument) {
      coursesBatch = this.angularFireStore.collection(this.coursesConstant, ref =>
        ref
          .orderBy('name')
          .limit(this.batchSize)
          .startAfter(lastVisibleDocument)
      );
    } else {
      coursesBatch = this.angularFireStore.collection(this.coursesConstant, ref =>
        ref
          .orderBy('name')
          .limit(this.batchSize)
      );
    }

    return this.mapAndUpdate(coursesBatch);
  }

  mapAndUpdate(coursesCollection: AngularFirestoreCollection<any>): Observable<Course[]> {

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
