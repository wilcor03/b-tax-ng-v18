import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo:'bce', pathMatch: 'full' },
  { path: 'sumaria', loadChildren: () => import('./features/sumaria/sumaria.routes') },
  { path: 'bce', loadChildren: () => import('./features/bce/bce.routes') },
  { path: '**', redirectTo: 'bce' }
];
