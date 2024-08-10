import { SumariaModel } from '@features/sumaria/interfaces/sumaria.interface';
import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[sumaria] load');
export const storeData = createAction('[sumaria] store', props<{ payload: any[] }>());
export const loadDataSuccess = createAction('[sumaria] load data success', props<{ data: SumariaModel[] }>());