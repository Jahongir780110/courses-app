import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let mockStore: MockStore;

  const initialState = {
    auth: {
      token: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    guard = TestBed.inject(AuthGuardGuard);
    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
