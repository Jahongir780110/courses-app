import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { AppState } from 'src/app/state/app.state';
import { selectCourses } from 'src/app/state/courses/courses.selectors';
import * as CoursesActions from '../../state/courses/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [FilterPipe],
})
export class CoursesComponent implements OnInit {
  coursesCount = 5;
  courses: Course[] = [];

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(
        CoursesActions.getCourses({
          start: 0,
          count: this.coursesCount,
        })
      );
    }, 0); // If i remove setTimeout() it is showing ExpressionChangedAfterItHasBeenCheckedError in the console

    this.store.select(selectCourses).subscribe((courses) => {
      this.courses = courses;
    });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: Event) => {
          return (event.target as HTMLInputElement).value;
        }),
        filter((val) => val.length > 2 || val.length === 0),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((v) => this.searchCourses(v))
      )
      .subscribe();
  }

  searchCourses(searchText: string) {
    if (!searchText.length) {
      return this.store.dispatch(
        CoursesActions.getCourses({ start: 0, count: this.coursesCount })
      );
    } else {
      return this.store.dispatch(
        CoursesActions.searchCourses({ fragment: searchText })
      );
    }
  }

  loadMoreCourses() {
    this.coursesCount += 5;

    this.store.dispatch(
      CoursesActions.getCourses({
        start: 0,
        count: this.coursesCount,
      })
    );
  }

  showEditCoursePage(courseId: number) {
    this.router.navigate([courseId], {
      relativeTo: this.route,
    });
  }

  deleteCourse(courseId: number) {
    this.store.dispatch(CoursesActions.deleteCourse({ id: courseId }));
  }

  showAddCoursePage() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
  }

  identifyCourse(index: number, course: Course) {
    return course.id;
  }
}
