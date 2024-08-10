import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SumariaEffects } from 'src/app/store/effects/sumaria.effects';
import { bceReducer } from '@store/reducers/bce.reducer';
import { sumariaReducer } from 'src/app/store/reducers/sumaria.reducer';

const sumariaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/sumaria/sumaria.component').then(m => m.SumariaComponent),
    providers: [
      provideState({ name: 'sumaria', reducer: sumariaReducer }),
      provideState({ name: 'bce', reducer: bceReducer }),
      provideEffects(SumariaEffects)
    ]
  }
];

export default sumariaRoutes;