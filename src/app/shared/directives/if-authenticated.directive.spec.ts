import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

@Component({
  template: `<div *appIfAuthenticated>Authenticated</div>`,
})
class TestComponent {}

describe('IfAuthenticatedDirective', () => {
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
      declarations: [IfAuthenticatedDirective, TestComponent],
      providers: [provideMockStore({ initialState })],
    }).createComponent(TestComponent);

    template = fixture.nativeElement as HTMLElement;
    mockStore = TestBed.inject(MockStore);
  });

  it('shouln\'t show "Authenticated" text if not authenticated', () => {
    fixture.detectChanges();
    expect(template.querySelector('div')).not.toBeTruthy();
  });
});
