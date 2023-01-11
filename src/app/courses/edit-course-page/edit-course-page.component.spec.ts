import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, tap } from 'rxjs';
import { routes } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditCoursePageComponent } from './edit-course-page.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditCoursePageComponent', () => {
  let component: EditCoursePageComponent;
  let fixture: ComponentFixture<EditCoursePageComponent>;
  let template: HTMLElement;

  let courseService: CourseService;
  let authService: AuthenticationService;
  let location: Location;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCoursePageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthenticationService);
    courseService = TestBed.inject(CourseService);

    component.oldCourse = {
      id: 321,
      title: 'title',
      description: 'description',
      duration: 123,
      creationDate: new Date(),
      topRated: true,
      authors: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit course and redirect to "courses" page when "save" button is clicked', fakeAsync(() => {
    // we should be logged in before
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );
    const courseSpy = spyOn(courseService, 'updateCourse').and.returnValue(
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
