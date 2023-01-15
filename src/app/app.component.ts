import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';

import { selectIsLoading } from './state/loading/loading.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  isLoading$ = this.store.select(selectIsLoading);

  constructor(private store: Store<AppState>) {}
}
