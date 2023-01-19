import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/state/app.state';

import * as CoursesActions from '../../state/courses/courses.actions';
import {
  selectAuthors,
  selectEditingCourse,
} from 'src/app/state/courses/courses.selectors';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Author } from 'src/app/models/author.model';

interface formModel {
  title: string;
  description: string;
  date: string;
  duration: number;
  authors: Author[];
}

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css'],
})
export class EditCoursePageComponent implements OnInit {
  form: formModel = {
    title: '',
    description: '',
    date: new DatePipe('en').transform(new Date(), 'yyyy-MM-dd') as string,
    duration: 0,
    authors: [],
  };
  oldCourse!: Course;
  allAuthors: Author[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId') as string;

    setTimeout(() => {
      this.store.dispatch(CoursesActions.getCourse({ id: +courseId }));
      this.store.dispatch(CoursesActions.getAuthors());
    }, 0); // If i remove setTimeout() it is showing ExpressionChangedAfterItHasBeenCheckedError in the console

    this.store.select(selectEditingCourse).subscribe((course) => {
      if (course) {
        this.oldCourse = course;

        this.form.title = course.title;
        this.form.description = course.description;
        this.form.duration = course.duration;
        this.form.date = new DatePipe('en').transform(
          course.creationDate,
          'yyyy-MM-dd'
        ) as string;
        this.form.authors = [...course.authors];
      }
    });

    this.store.select(selectAuthors).subscribe((authors) => {
      this.allAuthors = authors;
    });
  }

  save(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.store.dispatch(
      CoursesActions.updateCourse({
        id: this.oldCourse.id,
        title: this.form.title,
        description: this.form.description,
        duration: this.form.duration,
        creationDate: new Date(this.form.date),
        isTopRated: this.oldCourse.topRated,
        authors: this.form.authors,
      })
    );
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
