import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardGuard } from '../services/auth-guard.guard';

import { CoursesComponent } from './courses/courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { EditCoursePageComponent } from './edit-course-page/edit-course-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'new',
    component: AddCoursePageComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: ':courseId',
    component: EditCoursePageComponent,
    // canActivate: [AuthGuardGuard],    // task 13 says every user should be able to access this route
  },
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    AddCoursePageComponent,
    EditCoursePageComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent, CourseCardComponent],
})
export class CoursesModule {}
