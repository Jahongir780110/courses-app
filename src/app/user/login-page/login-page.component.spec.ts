import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as AuthActions from '../../state/auth/auth.actions';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
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
      declarations: [LoginPageComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login action once login button is clicked', fakeAsync(() => {
    const form = template.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    tick();

    const expected = cold('a', {
      a: AuthActions.login({
        login: component.form.login,
        password: component.form.password,
      }),
    });
    expect(mockStore.scannedActions$).toBeObservable(expected);
  }));
});
