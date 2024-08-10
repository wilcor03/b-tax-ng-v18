import { BceModel } from '@features/bce/models/bce.model';
import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[bce] load');
export const storeData = createAction('[bce] store', props<{ payload: BceModel[] }>());
export const loadDataSuccess = createAction('[bce] load data success', props<{ data: BceModel[] }>());