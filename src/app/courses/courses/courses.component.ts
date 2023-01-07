import { Component, OnInit } from '@angular/core';
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
  searchText = '';
  filteredCourses: Course[] = [];
  isAddingCourse = false;

  constructor(
    private filterPipe: FilterPipe,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.filteredCourses = this.courseService.getCourses();

    this.courseService.coursesChanged.subscribe((courses) => {
      this.filteredCourses = courses;
    });
  }

  searchCourses() {
    this.filteredCourses = this.filterPipe.transform(
      this.courseService.getCourses(),
      this.searchText
    );
  }

  loadMoreCourses() {
    console.log('log more');
  }

  editCourse(courseId: number) {
    console.log(courseId);
  }

  deleteCourse(courseId: number) {
    this.courseService.removeCourse(courseId);
  }

  showAddCoursePage() {
    this.isAddingCourse = true;
  }

  identifyCourse(index: number, course: Course) {
    return course.id;
  }
}
