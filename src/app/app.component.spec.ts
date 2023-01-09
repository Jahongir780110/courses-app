import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { routes } from './app.module';
import { AuthenticationService } from './services/authentication.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let template: HTMLElement;
  let authService: AuthenticationService;

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
        UserModule,
        CoursesModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthenticationService);
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    expect(component.title).toEqual('my-app');
  });

  it('should contain header', () => {
    expect(template.querySelector('app-header')).toBeTruthy();
  });

  it('should contain footer', () => {
    expect(template.querySelector('app-footer')).toBeTruthy();
  });

  it('should redirect to login page in default page', fakeAsync(() => {
    router.navigate(['']);
    tick();

    expect(location.path()).toBe('/login');
  }));

  it('should redirect to login page if you enter courses page without authenticating', fakeAsync(() => {
    router.navigate(['/courses']);
    tick();

    expect(location.path()).toBe('/login');
  }));

  it('should redirect to courses page if you enter courses page with authenticating', fakeAsync(() => {
    authService.login({
      id: Math.random(),
      email: 'sampleemail@gmail.com',
      password: '123456',
    });

    router.navigate(['/courses']);
    tick();

    expect(location.path()).toBe('/courses');
  }));
});
