import { LoadingState } from './loading/loading.reducer';
import { AuthState } from './auth/auth.reducers';
import { CoursesState } from './courses/courses.reducers';

export interface AppState {
  loading: LoadingState;
  auth: AuthState;
  courses: CoursesState;
}
