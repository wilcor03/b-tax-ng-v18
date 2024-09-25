import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectEmptyCanvas = createFeatureSelector<any>('empty-canvas');

export const emptyCanvasDataSelector = createSelector(
  selectEmptyCanvas,
  (state: any) => {
    if (!state) return [];

    const data = state.data;
    const emptyArray = Array.from({ length: 3000 - state.data.length }, () => (new Array(15).fill(null)));

    console.log('EL MAP', [...data, ...emptyArray]);
    return [...data, ...emptyArray];

    // return state.data;
  }
);

