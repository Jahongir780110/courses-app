import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './header.component';

import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as AuthActions from '../../state/auth/auth.actions';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let template: HTMLElement;

  let mockStore: MockStore;
  const initialState = {
    auth: {
      user: null,
      token: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [HeaderComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    expect(template.querySelector('app-logo')).toBeTruthy();
  });

  it('should show user data correctly if authenticated', () => {
    mockStore.setState({
      ...initialState,
      auth: {
        user: {
          name: {
            first: 'First',
            last: 'Last',
          },
          token: '',
        },
      },
    });

    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[0].textContent
    ).toBe('First Last');
  });

  it("should contain 'log off' if authenticated", () => {
    mockStore.setState({
      auth: {
        user: {
          name: {
            first: 'First',
            last: 'Last',
          },
          token: 'token',
        },
      },
    });

    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[1].textContent
    ).toBe('Log off');
  });

  it('should dispatch logout action when "Log off" button is clicked', fakeAsync(() => {
    mockStore.setState({
      auth: {
        user: {
          name: {
            first: 'First',
            last: 'Last',
          },
          token: 'token',
        },
      },
    });

    fixture.detectChanges();

    const logOffBtn = template
      .querySelectorAll('.navbar-nav .nav-item')[1]
      .querySelector('span') as HTMLButtonElement;

    logOffBtn.dispatchEvent(new Event('click'));
    tick();

    const expected = cold('a', { a: AuthActions.logout() });
    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));
});
