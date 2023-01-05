import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course.model';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have courses', () => {
    expect(service.courses.length).toBeGreaterThan(0);
  });

  it('should create new course', () => {
    const newCourse: Course = {
      id: 1,
      title: 'Sample title',
      creationDate: new Date(),
      duration: 'Sample duration',
      description: 'Sample description',
      topRated: true,
    };
    const courses = [...service.getCourses()];
    service.createCourse(newCourse);
    expect([...courses, newCourse]).toEqual(service.getCourses());
  });

  it('should remove course', () => {
    const courses = [...service.getCourses()];
    const firstCourseId = courses[0].id;
    service.removeCourse(firstCourseId);
    expect(courses.slice(1)).toEqual(service.getCourses());
  });
});
