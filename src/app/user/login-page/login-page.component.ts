import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login(e: Event) {
    e.preventDefault();

    const user: User = {
      id: Math.random(),
      email: this.email,
      password: this.password,
    };
    this.authenticationService.login(user);

    this.router.navigate(['/courses']);
  }
}
