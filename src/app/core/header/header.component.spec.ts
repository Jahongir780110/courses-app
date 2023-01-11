import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './header.component';

import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, tap } from 'rxjs';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let template: HTMLElement;
  let authService: AuthenticationService;
  let userLogin: { login: string; password: string };

  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    authService = TestBed.inject(AuthenticationService);

    location = TestBed.inject(Location);

    userLogin = {
      login: 'sampleemail@gmail.com',
      password: '123456',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    expect(template.querySelector('app-logo')).toBeTruthy();
  });

  it("should contain 'user login' if authenticated", () => {
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );

    authService.login(userLogin.login, userLogin.password).subscribe();
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[0].textContent
    ).toBe('User login');
  });

  it("should contain 'log off' if authenticated", () => {
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );

    authService.login(userLogin.login, userLogin.password).subscribe();
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[1].textContent
    ).toBe('Log off');
  });

  it('should log off and redirect to login page if "Log off" button is clicked', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );

    authService.login(userLogin.login, userLogin.password).subscribe();
    fixture.detectChanges();

    const logOffBtn = template
      .querySelectorAll('.navbar-nav .nav-item')[1]
      .querySelector('span');

    logOffBtn?.dispatchEvent(new Event('click'));
    tick();

    expect(authService.isAuthenticated()).toBeFalse();

    expect(location.path()).toBe('/login');
  }));
});
