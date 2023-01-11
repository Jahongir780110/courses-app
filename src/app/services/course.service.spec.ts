import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of, tap } from 'rxjs';
import { Course } from '../models/course.model';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let courseService: CourseService;
  let mockCourses: Course[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    courseService = TestBed.inject(CourseService);
    mockCourses = [
      {
        id: 1,
        title: 'title',
        description: 'description',
        creationDate: new Date(),
        duration: 12,
        topRated: true,
        authors: [],
      },
      {
        id: 2,
        title: 'title2',
        description: 'description2',
        creationDate: new Date(),
        duration: 134,
        topRated: false,
        authors: [],
      },
      {
        id: 3,
        title: 'title3',
        description: 'description3',
        creationDate: new Date(),
        duration: 312,
        topRated: true,
        authors: [],
      },
    ];
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should have courses when getCourses() is called', fakeAsync(() => {
    spyOn(courseService, 'getCourses').and.returnValue(
      of(mockCourses).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );
    courseService.getCourses(0, 5).subscribe();

    expect(courseService.courses.length).toBeGreaterThan(0);
  }));
});
