import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CourseDurationInputComponent } from './course-duration-input/course-duration-input.component';
import { CourseDateInputComponent } from './course-date-input/course-date-input.component';

@NgModule({
  declarations: [
    PromptModalComponent,
    ChangeBorderColorDirective,
    DurationPipe,
    FilterPipe,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective,
    OrderByPipe,
    CourseDurationInputComponent,
    CourseDateInputComponent,
    LogoComponent,
  ],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
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
    CourseDurationInputComponent,
    CourseDateInputComponent,
    LogoComponent,
  ],
})
export class SharedModule {}
