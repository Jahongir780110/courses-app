import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/state/app.state';

import * as CoursesActions from '../../state/courses/courses.actions';
import { selectEditingCourse } from 'src/app/state/courses/courses.selectors';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css'],
})
export class EditCoursePageComponent implements OnInit {
  title = '';
  description = '';
  duration = 0;
  date!: Date;
  oldCourse: Course | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId') as string;

    setTimeout(() => {
      this.store.dispatch(CoursesActions.getCourse({ id: +courseId }));
    }, 0); // If i remove setTimeout() it is showing ExpressionChangedAfterItHasBeenCheckedError in the console

    this.store.select(selectEditingCourse).subscribe((course) => {
      if (course) {
        this.oldCourse = course;

        this.title = course.title;
        this.description = course.description;
        this.duration = course.duration;
        this.date = course.creationDate;
      }
    });
  }

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
    const oldCourseCopy = { ...this.oldCourse } as Course;

    this.store.dispatch(
      CoursesActions.updateCourse({
        id: oldCourseCopy.id,
        title: this.title,
        description: this.description,
        duration: this.duration,
        creationDate: this.date,
        isTopRated: oldCourseCopy.topRated,
        authors: oldCourseCopy.authors,
      })
    );
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
