import { Routes } from '@angular/router';

const sumariaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sumaria.component').then(m => m.SumariaComponent)
  }
];

export default sumariaRoutes;