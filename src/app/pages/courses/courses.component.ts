import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
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

  constructor(private filterPipe: FilterPipe) {}

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: '88 min',
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: '27 min',
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: '125 min',
        creationDate: new Date(2018, 8, 3),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
    ];
    this.filteredCourses = this.courses;
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

  deleteCourse(courseId: number) {
    console.log(courseId);
  }

  identifyCourse(index: number, course: Course) {
    return course.id;
  }
}
