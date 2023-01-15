import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddCoursePageComponent } from './add-course-page.component';
import { routes } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as CoursesActions from '../../state/courses/courses.actions';
import { cold } from 'jasmine-marbles';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let template: HTMLElement;
  let location: Location;

  let mockStore: MockStore;
  const initialState = {
    courses: {
      courses: [],
      editingCourse: null,
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
      declarations: [],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    location = TestBed.inject(Location);

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createCourse action when "save" button is clicked', fakeAsync(() => {
    const saveBtn = template.querySelectorAll('.bottom button')[1];
    saveBtn.dispatchEvent(new Event('click'));

    tick();

    const expected = cold('a', {
      a: CoursesActions.createCourse({
        title: '',
        description: '',
        duration: 0,
        creationDate: component.date,
        isTopRated: true,
        authors: [],
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
