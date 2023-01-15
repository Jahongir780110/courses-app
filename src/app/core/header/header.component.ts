import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  user: User | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
