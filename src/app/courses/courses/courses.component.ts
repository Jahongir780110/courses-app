import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [FilterPipe],
})
export class CoursesComponent implements OnInit {
  coursesCount = 5;
  searchText = '';

  constructor(
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseService.getCourses(0, 5).subscribe();
  }

  searchCourses() {
    if (!this.searchText.length) {
      this.courseService.getCourses(0, this.coursesCount).subscribe();
      return;
    }

    this.courseService.searchCourses(this.searchText).subscribe();
  }

  loadMoreCourses() {
    this.coursesCount += 5;
    this.courseService.getCourses(0, this.coursesCount).subscribe();
  }

  showEditCoursePage(courseId: number) {
    this.router.navigate([courseId], {
      relativeTo: this.route,
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.removeCourse(courseId).subscribe(() => {
      this.courseService.getCourses(0, this.coursesCount).subscribe();
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
