import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  constructor(private authenticationService: AuthenticationService) {}

  logout() {
    this.authenticationService.logout();
    console.log('Log out');
  }
}
