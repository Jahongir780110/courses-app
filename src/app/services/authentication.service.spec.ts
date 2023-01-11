import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.module';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, tap } from 'rxjs';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let location: Location;
  let mockUserLogin: { login: string; password: string };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
    });

    authService = TestBed.inject(AuthenticationService);
    location = TestBed.inject(Location);

    mockUserLogin = {
      login: 'sampleemail@gmail.com',
      password: '123456',
    };
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should show isAuthenticated correctly', fakeAsync(() => {
    expect(authService.isAuthenticated()).toBeFalse;

    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
        })
      )
    );

    authService.login(mockUserLogin.login, mockUserLogin.password).subscribe();

    expect(authService.isAuthenticated()).toBeTrue();
  }));

  it('logout() should clear user info and token and redirect to "login" page', fakeAsync(() => {
    authService.logout();

    tick();

    expect(location.path()).toBe('/login');
    expect(authService.user).toBeNull();
    expect(authService.token).toBe('');
  }));
});
