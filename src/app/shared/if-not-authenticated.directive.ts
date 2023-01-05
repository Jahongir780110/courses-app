import {
  Directive,
  DoCheck,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIfNotAuthenticated]',
})
export class IfNotAuthenticatedDirective implements DoCheck {
  hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {}

  ngDoCheck() {
    if (!this.authenticationService.isAuthenticated && !this.hasView) {
      console.log('worked');

      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.authenticationService.isAuthenticated && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
