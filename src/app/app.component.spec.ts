import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesComponent } from './pages/courses/courses.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
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

  it('should contain breadcrumb', () => {
    expect(template.querySelector('app-breadcrumb')).toBeTruthy();
  });

  it('should contain courses', () => {
    expect(template.querySelector('app-courses')).toBeTruthy();
  });
});
