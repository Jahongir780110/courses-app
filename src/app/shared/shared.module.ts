import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { ChangeBorderColorDirective } from './change-border-color.directive';
import { DurationPipe } from './duration.pipe';
import { FilterPipe } from './filter.pipe';
import { IfAuthenticatedDirective } from './if-authenticated.directive';
import { IfNotAuthenticatedDirective } from './if-not-authenticated.directive';
import { OrderByPipe } from './order-by.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PromptModalComponent,
    ChangeBorderColorDirective,
    DurationPipe,
    FilterPipe,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective,
    OrderByPipe,
  ],
  imports: [CommonModule],
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
  ],
})
export class SharedModule {}
