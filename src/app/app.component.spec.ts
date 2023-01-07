import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let template: HTMLElement;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule, UserModule, CoursesModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    authService = TestBed.inject(AuthenticationService);
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
    authService.login({
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
    authService.login({
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    });
    fixture.detectChanges();

    expect(template.querySelector('app-courses')).toBeTruthy();
  });
});
