import { createReducer, on } from "@ngrx/store";
import { loadData, loadDataSuccess, storeData } from "../actions/sumaria.actions";
import { SumariaModel } from "@features/sumaria/interfaces/sumaria.interface";

export interface SumariaStateModel {
  data: SumariaModel[]
}

export const initialState: SumariaStateModel = {
  data: []
};

export const sumariaReducer = createReducer(
  initialState,
  on(loadData, (state) => {
    return { ...state }
  }),
  on(storeData, (state, payload) => ({ ...state, ...payload }) ),
  on(loadDataSuccess, (state, data) => ({ ...state, ...data }) ),
);