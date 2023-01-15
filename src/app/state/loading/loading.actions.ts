import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Loading] Set Loading',
  props<{ value: boolean }>()
);
