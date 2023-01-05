import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesComponent, CourseCardComponent],
})
export class CoursesModule {}
