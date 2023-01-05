import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { FilterPipe } from 'src/app/shared/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [FilterPipe],
})
export class CoursesComponent implements OnInit {
  searchText = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(
    private filterPipe: FilterPipe,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    this.filteredCourses = this.courses;

    this.courseService.coursesChanged.subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = this.courses;
    });
  }

  searchCourses() {
    this.filteredCourses = this.filterPipe.transform(
      this.courses,
      this.searchText
    );
  }

  loadMoreCourses() {
    console.log('log more');
  }

  editCourse(courseId: number) {
    console.log(courseId);
  }

  identifyCourse(index: number, course: Course) {
    return course.id;
  }
}
