import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let template: HTMLElement;

  let authService: AuthenticationService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    authService = TestBed.inject(AuthenticationService);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store user info and redirect to "courses" page once login button is clicked', fakeAsync(() => {
    component.email = 'sampleemail@gmail.com';
    component.password = 'sample password';
    fixture.detectChanges();

    const loginBtn = template.querySelector('.bottom button');
    loginBtn?.dispatchEvent(new Event('click'));
    tick();

    expect(authService.isAuthenticated()).toBeTrue();
    expect(location.path()).toBe('/courses');
  }));
});
