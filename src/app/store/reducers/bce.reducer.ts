import { createReducer, on } from "@ngrx/store";
import { loadData, loadDataSuccess, storeData } from "../actions/bce.actions";
import { BceModel } from "@features/bce/models/bce.model";

export interface BceStateModel {
  data: BceModel[]
}

export const initialState: BceStateModel = {
  data: []
};

export const bceReducer = createReducer(
  initialState,
  on(loadData, (state) => ({ ...state })),
  on(storeData, (state, payload) => ({ ...state, ...payload })),
  on(loadDataSuccess, (state, data) => ({ ...state, ...data })),
);