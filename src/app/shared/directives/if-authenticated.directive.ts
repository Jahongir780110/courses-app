import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectIsAuthenticated } from 'src/app/state/auth/auth.selectors';

@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective implements OnInit {
  hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(selectIsAuthenticated).subscribe((val) => {
      this.render(val);
    });
  }

  render(isAuthenticated: boolean) {
    if (isAuthenticated && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isAuthenticated && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
