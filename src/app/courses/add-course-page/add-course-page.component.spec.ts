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
import { TranslateTestingModule } from 'ngx-translate-testing';

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
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en-US.json'),
          uz: require('src/assets/i18n/uz-UZ.json'),
        }),
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
    component.form.title = 'title';
    component.form.description = 'description';
    component.form.date = '2019-03-04';
    component.form.duration = 12;
    component.form.authors = [{ name: 'Name', id: '123' }];

    fixture.detectChanges();
    tick();

    const form = template.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    tick();

    const expected = cold('a', {
      a: CoursesActions.createCourse({
        title: component.form.title,
        description: component.form.description,
        creationDate: new Date(component.form.date),
        duration: component.form.duration,
        isTopRated: true,
        authors: component.form.authors,
      }),
    });
    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));

  it('submit button should be disabled if the form is invalid', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const submitBtn = template.querySelector(
      '.bottom .btn-success'
    ) as HTMLButtonElement;

    expect(submitBtn.disabled).toBeTrue();
  }));

  it('should redirect to "courses" page when "cancel" button is clicked', fakeAsync(() => {
    const cancelBtn = template.querySelectorAll('.bottom button')[0];
    cancelBtn.dispatchEvent(new Event('click'));

    tick();

    expect(location.path()).toBe('/courses');
  }));
});
