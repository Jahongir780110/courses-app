import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [FilterPipe],
})
export class CoursesComponent implements OnInit {
  coursesCount = 5;

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    public courseService: CourseService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseService.getCourses(0, 5).subscribe();

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: Event) => {
          return (event.target as HTMLInputElement).value;
        }),
        filter((val) => val.length > 2 || val.length === 0),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((v) => this.searchCourses(v))
      )
      .subscribe();
  }

  searchCourses(searchText: string) {
    if (!searchText.length) {
      return this.courseService.getCourses(0, this.coursesCount);
    } else {
      return this.courseService.searchCourses(searchText);
    }
  }

  loadMoreCourses() {
    this.loadingService.loadingChanged.next(true);

    this.coursesCount += 5;

    this.courseService.getCourses(0, this.coursesCount).subscribe(() => {
      this.loadingService.loadingChanged.next(false);
    });
  }

  showEditCoursePage(courseId: number) {
    this.router.navigate([courseId], {
      relativeTo: this.route,
    });
  }

  deleteCourse(courseId: number) {
    this.loadingService.loadingChanged.next(true);
    this.courseService.removeCourse(courseId).subscribe(() => {
      this.courseService.getCourses(0, this.coursesCount).subscribe(() => {
        this.loadingService.loadingChanged.next(false);
      });
    });
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
