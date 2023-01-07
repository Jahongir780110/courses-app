import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let template: HTMLElement;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store user info once login button is clicked', () => {
    component.email = 'sampleemail@gmail.com';
    component.password = 'sample password';
    fixture.detectChanges();

    const loginBtn = template.querySelector('.bottom button');
    loginBtn?.dispatchEvent(new Event('click'));

    expect(authService.isAuthenticated()).toBeTrue();
  });
});
