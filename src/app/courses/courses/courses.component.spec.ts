import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { CourseCardComponent } from 'src/app/courses/course-card/course-card.component';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesComponent } from './courses.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseService } from 'src/app/services/course.service';
import { of, tap } from 'rxjs';
import { Course } from 'src/app/models/course.model';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let template: HTMLElement;
  let courseService: CourseService;
  let location: Location;
  let mockCourses: Course[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [CoursesComponent, CourseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;

    courseService = TestBed.inject(CourseService);
    location = TestBed.inject(Location);

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show call getCourses() in beginning', () => {
    const courseSpy = spyOn(courseService, 'getCourses').and.returnValue(
      of(mockCourses).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );

    fixture.detectChanges();

    expect(courseSpy).toHaveBeenCalled();
  });

  it('should filter courses when search text length is more than 2', fakeAsync(() => {
    fixture.detectChanges();

    const courseSpy = spyOn(courseService, 'searchCourses').and.returnValue(
      of()
    );

    const searchInput = template.querySelector(
      '.search input'
    ) as HTMLInputElement;
    searchInput.value = 'test';

    searchInput.dispatchEvent(new Event('keyup'));
    tick(2000);

    expect(courseSpy).toHaveBeenCalled();
  }));

  it('shouldn\'t show "log more" if there are no courses', () => {
    spyOn(courseService, 'getCourses').and.returnValue(
      of([]).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );

    fixture.detectChanges();

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;

    expect(loadMoreBtn).not.toBeTruthy();
  });

  it('should call getCourses() when "load more" button is clicked', () => {
    const coursesSpy = spyOn(courseService, 'getCourses').and.returnValue(
      of(mockCourses).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );

    fixture.detectChanges();

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;

    loadMoreBtn.dispatchEvent(new Event('click'));

    expect(coursesSpy).toHaveBeenCalled();
  });

  it('should show "no courses" text if there are no courses', () => {
    spyOn(courseService, 'getCourses').and.returnValue(
      of([]).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );

    fixture.detectChanges();

    expect(template.querySelector('.no-data')).toBeTruthy();
  });

  it('should redirect to edit-course page when showEditCourse() is called', fakeAsync(() => {
    component.showEditCoursePage(1);

    tick();

    expect(location.path()).toBe('/1');
  }));

  it('should redirect to add-course page if "add course" button is clicked', fakeAsync(() => {
    const addCourseBtn = template.querySelector('.add-course button');
    addCourseBtn?.dispatchEvent(new Event('click'));

    tick();

    expect(location.path()).toBe('/new');
  }));

  it('should call removeCourse() if deleteCourse() method is fired', fakeAsync(() => {
    spyOn(courseService, 'getCourses').and.returnValue(
      of(mockCourses).pipe(
        tap((courses) => {
          courseService.courses = courses;
        })
      )
    );
    fixture.detectChanges();

    const courseSpy = spyOn(courseService, 'removeCourse').and.returnValue(
      of()
    );

    component.deleteCourse(1);

    expect(courseSpy).toHaveBeenCalled();
  }));
});
