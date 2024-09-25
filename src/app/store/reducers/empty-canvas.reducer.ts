import { createReducer, on } from "@ngrx/store";
import { loadData, loadDataSuccess, storeData } from "@store/actions/empty-canvas.actions";


export interface EmptyCanvasStateModel {
  data: any[]
}

export const initialState: EmptyCanvasStateModel = {
  data: []
};

export const emptyCanvasReducer = createReducer(
  initialState,
  on(loadData, (state) => {
    return { ...state }
  }),
  on(storeData, (state, payload) => ({ ...state, ...payload }) ),
  on(loadDataSuccess, (state, data) => ({ ...state, ...data }) ),
);