import { createReducer, on, State } from "@ngrx/store";
import { storeData } from "../actions/bce.actions";

export const initialState = {
  home: 10,
  away: 0,
};

export const _bceReducer = createReducer(
  initialState,
  on(storeData, (state, {text}) => ({ ...state, home: state.home + 1, text }) )
);

export function bceReducer(state: any, action: any){
  return _bceReducer(state, action)
}