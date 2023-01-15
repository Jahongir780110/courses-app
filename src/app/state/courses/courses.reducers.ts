import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
  courses: Course[];
  editingCourse: Course | null;
}

export const initialState: CoursesState = {
  courses: [],
  editingCourse: null,
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
  })
);
