import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import * as CoursesActions from '../../state/courses/courses.actions';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent {
  title = '';
  description = '';
  duration = 0;
  date = new Date();

  constructor(private store: Store<AppState>, private router: Router) {}

  changeTitle(e: Event) {
    this.title = (e.target as HTMLInputElement).value;
  }

  changeDescription(e: Event) {
    this.description = (e.target as HTMLTextAreaElement).value;
  }

  changeDuration(e: number) {
    this.duration = e;
  }

  changeDate(e: Date) {
    this.date = e;
  }

  save() {
    this.store.dispatch(
      CoursesActions.createCourse({
        title: this.title,
        description: this.description,
        duration: this.duration,
        creationDate: this.date,
        isTopRated: true,
        authors: [],
      })
    );
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
