import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BceStateModel } from '../reducers/bce.reducer';

export const selectBce = createFeatureSelector<BceStateModel>('bce');

export const bceDataSelector = createSelector(
  selectBce,
  (state: BceStateModel) => state.data
);

export const bceItemsMoveToSumariaSelector = createSelector(
  selectBce,
  (state: BceStateModel) => state.data.filter(row => row.accountLevel !== null && row.accountLevel !== '')
);