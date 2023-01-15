import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { LoadingState } from './loading.reducer';

export const selectLoading = (state: AppState) => state.loading;

export const selectIsLoading = createSelector(
  selectLoading,
  (state: LoadingState) => state.isLoading
);
