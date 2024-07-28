import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { bceReducer } from 'src/app/store/reducers/bce.reducer';

const sumariaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bce.component').then(m => m.BceComponent),
    providers: [
      provideState({ name: 'bce', reducer: bceReducer })
    ]
  }
];

export default sumariaRoutes;