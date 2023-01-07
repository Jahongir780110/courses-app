import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course.model';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    courseService = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should have courses', () => {
    expect(courseService.courses.length).toBeGreaterThan(0);
  });

  it('should create new course', () => {
    const newCourse: Course = {
      id: 1,
      title: 'Sample title',
      creationDate: new Date(),
      duration: 72,
      description: 'Sample description',
      topRated: true,
    };
    const courses = [...courseService.getCourses()];

    courseService.createCourse(newCourse);
    expect([...courses, newCourse]).toEqual(courseService.getCourses());
  });

  it('should remove course', () => {
    const courses = [...courseService.getCourses()];
    const firstCourseId = courses[0].id;

    courseService.removeCourse(firstCourseId);
    expect(courses.slice(1)).toEqual(courseService.getCourses());
  });
});
