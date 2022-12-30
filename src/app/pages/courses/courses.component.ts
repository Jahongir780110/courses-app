import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  searchText = '';
  courses: Course[] = [];

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: '1h 28 min',
        creationDate: '9 Nov, 2018',
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
      },
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: '1h 12 min',
        creationDate: '12 Nov, 2018',
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: '2h 05 min',
        creationDate: '3 Sep, 2018',
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
      },
    ];
  }

  searchCourses() {
    console.log(this.searchText);
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
