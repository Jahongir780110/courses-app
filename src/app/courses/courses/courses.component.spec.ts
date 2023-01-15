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
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesComponent } from './courses.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Course } from 'src/app/models/course.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as CoursesActions from '../../state/courses/courses.actions';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let template: HTMLElement;
  let location: Location;
  let mockCourses: Course[];

  let mockStore: MockStore;
  const initialState = {
    courses: {
      courses: [],
      editingCourse: {
        id: 321,
        title: 'title',
        description: 'description',
        duration: 123,
        creationDate: new Date(),
        topRated: true,
        authors: [],
      },
    },
    auth: {
      token: 'token',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [CoursesComponent, CourseCardComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;

    location = TestBed.inject(Location);

    mockStore = TestBed.inject(MockStore);

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

  it('should dispatch getCourses action in beginning', fakeAsync(() => {
    const expected = cold('a', {
      a: CoursesActions.getCourses({ start: 0, count: component.coursesCount }),
    });

    fixture.detectChanges();
    tick();

    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));

  it('should filter courses when search text length is more than 2', fakeAsync(() => {
    fixture.detectChanges();

    const expected = cold('a', {
      a: CoursesActions.searchCourses({ fragment: 'test' }),
    });

    const searchInput = template.querySelector(
      '.search input'
    ) as HTMLInputElement;
    searchInput.value = 'test';

    searchInput.dispatchEvent(new Event('keyup'));
    tick(2000);

    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));

  it('shouldn\'t show "log more" if there are no courses', () => {
    fixture.detectChanges();

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;

    expect(loadMoreBtn).not.toBeTruthy();
  });

  it('should call getCourses() when "load more" button is clicked', () => {
    fixture.detectChanges();

    mockStore.setState({
      courses: {
        courses: mockCourses,
        editingCourse: {
          id: 321,
          title: 'title',
          description: 'description',
          duration: 123,
          creationDate: new Date(),
          topRated: true,
          authors: [],
        },
      },
      auth: {
        token: 'token',
      },
    });

    fixture.detectChanges();

    const expected = cold('a', {
      a: CoursesActions.getCourses({
        start: 0,
        count: component.coursesCount + 5,
      }),
    });

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;
    loadMoreBtn.dispatchEvent(new Event('click'));

    expect(mockStore.scannedActions$).toBeObservable(expected);
  });

  it('should show "no courses" text if there are no courses', () => {
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

  it('should call removeCourse() if deleteCourse() method is fired', () => {
    const expected = cold('a', {
      a: CoursesActions.deleteCourse({ id: 1 }),
    });

    component.deleteCourse(1);

    expect(mockStore.scannedActions$).toBeObservable(expected);
  });
});
