import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from 'src/app/services/course.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddCoursePageComponent } from './add-course-page.component';
import { routes } from 'src/app/app.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, tap } from 'rxjs';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let template: HTMLElement;

  let authService: AuthenticationService;
  let courseService: CourseService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    authService = TestBed.inject(AuthenticationService);
    courseService = TestBed.inject(CourseService);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new course and redirect to "courses" page when "save" button is clicked', fakeAsync(() => {
    // we should be logged in before
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );
    const courseSpy = spyOn(courseService, 'createCourse').and.returnValue(
      of('test')
    );

    authService.login('sampleemail@gmail.com', '123456').subscribe();

    const saveBtn = template.querySelectorAll('.bottom button')[1];
    saveBtn.dispatchEvent(new Event('click'));

    tick();

    expect(courseSpy).toHaveBeenCalled();
    expect(location.path()).toBe('/courses');
  }));

  it('should redirect to "courses" page when "cancel" button is clicked', fakeAsync(() => {
    // we should be logged in before
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );
    authService.login('sampleemail@gmail.com', '123456').subscribe();

    const cancelBtn = template.querySelectorAll('.bottom button')[0];
    cancelBtn.dispatchEvent(new Event('click'));

    tick();
    expect(location.path()).toBe('/courses');
  }));
});
