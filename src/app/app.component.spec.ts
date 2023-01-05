import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { LogoComponent } from './shared/logo/logo.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let template: HTMLElement;
  let service: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, SharedModule, UserModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        CoursesComponent,
        LogoComponent,
        CourseCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    service = TestBed.inject(AuthenticationService);
  });

  it('should create the app', () => {
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

  it('should contain breadcrumb if authenticated', () => {
    service.login({
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    });
    fixture.detectChanges();

    expect(template.querySelector('app-breadcrumb')).toBeTruthy();
  });

  it('should contain login page if not authenticated', () => {
    fixture.detectChanges();
    expect(template.querySelector('app-login-page')).toBeTruthy();
  });

  it('should contain courses if authenticate', () => {
    service.login({
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    });
    fixture.detectChanges();

    expect(template.querySelector('app-courses')).toBeTruthy();
  });
});
