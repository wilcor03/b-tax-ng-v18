import { bceReducer, BceStateModel } from './bce.reducer';
import { sumariaReducer, SumariaStateModel } from './sumaria.reducer';

export interface AppState {
  bce: BceStateModel,
  sumaria: SumariaStateModel
}

export const appReducers = [
  { name: 'bce', reducer: bceReducer },
  { name: 'sumaria', reducer: sumariaReducer },
]

