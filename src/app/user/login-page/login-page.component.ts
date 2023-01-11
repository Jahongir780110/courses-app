import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  login = 'flastname';
  password = 'flastname';
  error: null | string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  loginHandler(e: Event) {
    e.preventDefault();

    this.authenticationService.login(this.login, this.password).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (errorObject) => {
        this.error =
          typeof errorObject.error === 'string'
            ? errorObject.error
            : 'Oops! Something went wrong!';
      },
    });
  }
}
