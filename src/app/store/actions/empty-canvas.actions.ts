import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[empty canvas] load');
export const storeData = createAction('[empty canvas] store', props<{ payload: any[] }>());
export const loadDataSuccess = createAction('[empty canvas] load data success', props<{ data: any[] }>());