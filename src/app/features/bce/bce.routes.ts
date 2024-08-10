import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BceEffects } from 'src/app/store/effects/bce.effects';
import { bceReducer } from 'src/app/store/reducers/bce.reducer';

const bceRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/bce/bce.component').then(m => m.BceComponent),
    providers: [
      provideState({ name: 'bce', reducer: bceReducer }),
      provideEffects(BceEffects)
    ]
  }
];

export default bceRoutes;