import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditCoursePageComponent } from './edit-course-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as CoursesActions from '../../state/courses/courses.actions';
import { Course } from 'src/app/models/course.model';

describe('EditCoursePageComponent', () => {
  let component: EditCoursePageComponent;
  let fixture: ComponentFixture<EditCoursePageComponent>;
  let template: HTMLElement;

  let location: Location;

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
        RouterTestingModule.withRoutes(routes),
        SharedModule,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(id: string) {
                  return '1';
                },
              },
            },
          },
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCoursePageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    location = TestBed.inject(Location);

    mockStore = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateCourse action when "save" button is clicked', fakeAsync(() => {
    const saveBtn = template.querySelectorAll('.bottom button')[1];
    saveBtn.dispatchEvent(new Event('click'));

    tick();

    const expected = cold('a', {
      a: CoursesActions.updateCourse({
        id: (component.oldCourse as Course).id,
        title: component.title,
        description: component.description,
        duration: component.duration,
        creationDate: component.date,
        isTopRated: (component.oldCourse as Course).topRated,
        authors: (component.oldCourse as Course).authors,
      }),
    });
    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));

  it('should redirect to "courses" page when "cancel" button is clicked', fakeAsync(() => {
    const cancelBtn = template.querySelectorAll('.bottom button')[0];
    cancelBtn.dispatchEvent(new Event('click'));

    tick();

    expect(location.path()).toBe('/courses');
  }));
});
