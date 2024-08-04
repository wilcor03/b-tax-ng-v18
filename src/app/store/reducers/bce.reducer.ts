import { createReducer, on, State } from "@ngrx/store";
import { loadData, loadDataSuccess, storeData } from "../actions/bce.actions";
import { BceModel } from "@core/models/bce.model";

export interface BceStateModel {
  data: BceModel[]
}

export const initialState: BceStateModel = {
  data: []
};

export const bceReducer = createReducer(
  initialState,
  on(loadData, (state) => {
    return { ...state }
  }),
  on(storeData, (state, payload) => ({ ...state, ...payload }) ),
  on(loadDataSuccess, (state, data) => ({ ...state, ...data }) ),
);

// export function bceReducer(state: any, action: any){
//   return _bceReducer(state, action)
// }