import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Author } from 'src/app/models/author.model';
import { AppState } from 'src/app/state/app.state';
import { selectAuthors } from 'src/app/state/courses/courses.selectors';

import * as CoursesActions from '../../state/courses/courses.actions';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent implements OnInit {
  form = {
    title: '',
    description: '',
    date: new DatePipe('en').transform(new Date(), 'yyyy-MM-dd') as string,
    duration: 0,
  };
  allAuthors: Author[] = [];
  selectedAuthors: Author[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(CoursesActions.getAuthors());
    }, 0); // If i remove setTimeout() it is showing ExpressionChangedAfterItHasBeenCheckedError in the console

    this.store.select(selectAuthors).subscribe((authors) => {
      this.allAuthors = authors;
    });
  }

  save(form: NgForm) {
    if (form.invalid || !this.selectedAuthors.length) return;

    this.store.dispatch(
      CoursesActions.createCourse({
        title: this.form.title,
        description: this.form.description,
        creationDate: new Date(this.form.date),
        duration: this.form.duration,
        isTopRated: true,
        authors: this.selectedAuthors,
      })
    );
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  setSelectedAuthors(authors: Author[]) {
    this.selectedAuthors = authors;
  }
}
