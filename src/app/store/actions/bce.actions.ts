import { createAction, props } from '@ngrx/store';

export const storeData = createAction(
  '[bce] store',
  props<{ text: string }>()
);