import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show isAuthenticated correctly', () => {
    let isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeFalse;

    const user = {
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    };
    service.login(user);

    isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
  });

  it('logout() should clear user info and token', () => {
    const user = {
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    };
    service.login(user);
    service.logout();
    expect(service.user).toBeNull();
    expect(service.token).toBe('');
  });
});
