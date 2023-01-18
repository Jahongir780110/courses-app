import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { Author } from 'src/app/models/author.model';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
  courses: Course[];
  editingCourse: Course | null;
  authors: Author[];
}

export const initialState: CoursesState = {
  courses: [],
  editingCourse: null,
  authors: [],
};

export const coursesReducer = createReducer(
  initialState,

  on(CoursesActions.getCoursesSuccess, (state, payload) => {
    return {
      ...state,
      courses: payload.courses,
    };
  }),

  on(CoursesActions.getCourseSuccess, (state, payload) => {
    return {
      ...state,
      editingCourse: payload.course,
    };
  }),

  on(CoursesActions.getAuthorsSuccess, (state, payload) => {
    return {
      ...state,
      authors: payload.authors,
    };
  })
);
