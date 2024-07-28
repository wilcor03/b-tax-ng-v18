import { ActionReducerMap } from "@ngrx/store"
import { bceReducer } from './bce.reducer'

export interface AppState {
  bce: any
}

export const appReducers = [
  { name: 'bce', reducer: bceReducer }
]

