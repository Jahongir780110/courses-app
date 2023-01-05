import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LogoComponent } from './components/logo/logo.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { ChangeBorderColorDirective } from './shared/change-border-color.directive';
import { DurationPipe } from './shared/duration.pipe';
import { OrderByPipe } from './shared/order-by.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { PromptModalComponent } from './shared/prompt-modal/prompt-modal.component';
import { UserModule } from './user/user.module';
import { IfAuthenticatedDirective } from './shared/if-authenticated.directive';
import { IfNotAuthenticatedDirective } from './shared/if-not-authenticated.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    BreadcrumbComponent,
    LogoComponent,
    CourseCardComponent,
    ChangeBorderColorDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    PromptModalComponent,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective,
  ],
  imports: [BrowserModule, FontAwesomeModule, FormsModule, UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
