import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userFirstName = '';
  userLastName = '';
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.userDataChanged.subscribe((data) => {
      if (data) {
        this.userFirstName = data.name.first;
        this.userLastName = data.name.last;
      } else {
        this.userFirstName = '';
        this.userLastName = '';
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
