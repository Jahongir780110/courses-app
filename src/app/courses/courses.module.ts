import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, AddCoursePageComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesComponent, CourseCardComponent],
})
export class CoursesModule {}
