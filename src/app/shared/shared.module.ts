import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LogoComponent } from './logo/logo.component';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { ChangeBorderColorDirective } from './directives/change-border-color.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { IfNotAuthenticatedDirective } from './directives/if-not-authenticated.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { CheckAuthorsIsNotEmptyDirective } from './directives/check-authors-is-not-empty.directive';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PromptModalComponent,
    ChangeBorderColorDirective,
    DurationPipe,
    FilterPipe,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective,
    OrderByPipe,
    LogoComponent,
    BreadcrumbComponent,
    AuthorsInputComponent,
    CheckAuthorsIsNotEmptyDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    PromptModalComponent,
    ChangeBorderColorDirective,
    DurationPipe,
    FilterPipe,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective,
    OrderByPipe,
    FormsModule,
    FontAwesomeModule,
    LogoComponent,
    BreadcrumbComponent,
    RouterModule,
    AuthorsInputComponent,
    CheckAuthorsIsNotEmptyDirective,
    TranslateModule,
  ],
})
export class SharedModule {}
