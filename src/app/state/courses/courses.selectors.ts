import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CoursesState } from './courses.reducers';

export const selectCoursesAll = (state: AppState) => state.courses;

export const selectCourses = createSelector(
  selectCoursesAll,
  (state: CoursesState) => state.courses
);

export const selectEditingCourse = createSelector(
  selectCoursesAll,
  (state: CoursesState) => state.editingCourse
);

export const selectAuthors = createSelector(
  selectCoursesAll,
  (state: CoursesState) => state.authors
);
