import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { routes } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditCoursePageComponent } from './edit-course-page.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';

describe('EditCoursePageComponent', () => {
  let component: EditCoursePageComponent;
  let fixture: ComponentFixture<EditCoursePageComponent>;
  let template: HTMLElement;

  let courseService: CourseService;
  let authService: AuthenticationService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), SharedModule],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCoursePageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthenticationService);
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit course and redirect to "courses" page when "cancel" button is clicked', fakeAsync(() => {
    // we should be logged in before
    authService.login({
      id: Math.random(),
      email: 'sampleemail@gmail.com',
      password: '123456',
    });

    const courseId = component.oldCourse?.id;

    if (component.oldCourse) {
      courseService.updateCourse({ ...component.oldCourse, title: 'test' });
    }

    const cancelBtn = template.querySelectorAll('.bottom button')[0];
    cancelBtn.dispatchEvent(new Event('click'));

    tick();

    expect(location.path()).toBe('/courses');
    expect(courseService.getCourse(courseId as number)?.title).toBe('test');
  }));

  it('should redirect to "courses" page when "cancel" button is clicked', fakeAsync(() => {
    // we should be logged in before
    authService.login({
      id: Math.random(),
      email: 'sampleemail@gmail.com',
      password: '123456',
    });

    const cancelBtn = template.querySelectorAll('.bottom button')[0];
    cancelBtn.dispatchEvent(new Event('click'));

    tick();
    expect(location.path()).toBe('/courses');
  }));
});
