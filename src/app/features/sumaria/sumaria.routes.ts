import { Routes } from '@angular/router';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SumariaEffects } from 'src/app/store/effects/sumaria.effects';
import { EmptyCanvasEffects } from '@store/effects/empty-canvas.effects';

import { bceReducer } from '@store/reducers/bce.reducer';
import { sumariaReducer } from 'src/app/store/reducers/sumaria.reducer';
import { emptyCanvasReducer } from '@store/reducers/empty-canvas.reducer';

const sumariaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/sumaria/sumaria.component').then(m => m.SumariaComponent),
    providers: [
      provideState({ name: 'sumaria', reducer: sumariaReducer }),
      provideState({ name: 'bce', reducer: bceReducer }),
      provideState({ name: 'empty-canvas', reducer: emptyCanvasReducer }),
      provideEffects([SumariaEffects, EmptyCanvasEffects])
    ]
  }
];

export default sumariaRoutes;