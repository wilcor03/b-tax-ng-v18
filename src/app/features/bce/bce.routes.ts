import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BceEffects } from 'src/app/store/effects/bce.effects';
import { bceReducer } from 'src/app/store/reducers/bce.reducer';

const sumariaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bce.component').then(m => m.BceComponent),
    providers: [
      provideState({ name: 'bce', reducer: bceReducer }),
      provideEffects(BceEffects)
    ]
  }
];

export default sumariaRoutes;