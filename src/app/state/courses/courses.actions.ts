import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/models/author.model';
import { Course } from 'src/app/models/course.model';

export const getCourses = createAction(
  '[Courses] Get Courses',
  props<{ start: number; count: number }>()
);

export const getCoursesSuccess = createAction(
  '[Courses] Get Courses Success',
  props<{ courses: Course[] }>()
);

export const searchCourses = createAction(
  '[Courses] Search Courses',
  props<{ fragment: string }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const getCourse = createAction(
  '[Courses] Get Course',
  props<{ id: number }>()
);

export const getCourseSuccess = createAction(
  '[Courses] Get Course Success',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{
    id: number;
    title: string;
    description: string;
    duration: number;
    creationDate: Date;
    isTopRated: boolean;
    authors: Author[];
  }>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{
    title: string;
    description: string;
    duration: number;
    creationDate: Date;
    isTopRated: boolean;
    authors: Author[];
  }>()
);
