import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIfNotAuthenticated]',
})
export class IfNotAuthenticatedDirective implements OnInit {
  hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.render(this.authenticationService.isAuthenticated());

    this.authenticationService.authenticationChanged.subscribe(
      (isAuthenticated) => {
        this.render(isAuthenticated);
      }
    );
  }

  render(isAuthenticated: boolean) {
    if (!isAuthenticated && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (isAuthenticated && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
