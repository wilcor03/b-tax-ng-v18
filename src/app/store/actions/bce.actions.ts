import { BceModel } from '@core/models/bce.model';
import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[bce] load');
export const storeData = createAction('[bce] store', props<{ payload: any[] }>());
export const loadDataSuccess = createAction('[bce] load data success', props<{ data: BceModel[] }>());