import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IfNotAuthenticatedDirective } from './if-not-authenticated.directive';

@Component({
  template: `<div *appIfNotAuthenticated id="authenticated">
    Authenticated
  </div>`,
})
class TestComponent {}

describe('IfNotAuthenticatedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let template: HTMLElement;
  let mockStore: MockStore;

  const initialState = {
    auth: {
      token: '',
    },
  };

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IfNotAuthenticatedDirective, TestComponent],
      providers: [provideMockStore({ initialState })],
    }).createComponent(TestComponent);

    template = fixture.nativeElement as HTMLElement;
    mockStore = TestBed.inject(MockStore);
  });

  it('shouln\'t show "Authenticated" text if authenticated', () => {
    mockStore.setState({
      auth: {
        token: 'token',
      },
    });

    fixture.detectChanges();

    expect(template.querySelector('div')).not.toBeTruthy();
  });
});
