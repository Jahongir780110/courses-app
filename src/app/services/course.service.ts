import { EventEmitter, Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [];

  coursesChanged: EventEmitter<Course[]> = new EventEmitter<Course[]>();

  constructor() {
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
  }

  getCourses(): Course[] {
    return this.courses;
  }

  createCourse(course: Course) {
    this.courses.push(course);
  }

  getCourse(id: number): Course | null {
    return this.courses.find((course) => course.id === id) || null;
  }

  updateCourse(course: Course) {
    const courseIndex = this.courses.findIndex((c) => c.id === course.id);
    this.courses[courseIndex] = course;
  }

  removeCourse(id: number) {
    const courseIndex = this.courses.findIndex((c) => c.id === id);
    this.courses.splice(courseIndex, 1);

    this.coursesChanged.emit(this.courses);
  }
}
